import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { plantingPlans, harvests, activities, farms, zones, crops } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const farmOperationsRouter = router({
  // Calendar Events
  getCalendarEvents: protectedProcedure
    .input(z.object({ farmId: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const farmActivities = await db.select().from(activities).where(eq(activities.farmId, input.farmId));
      const farmHarvests = await db.select().from(harvests).where(eq(harvests.farmId, input.farmId));
      const farmPlans = await db.select().from(plantingPlans).where(eq(plantingPlans.farmId, input.farmId));
      const farmZones = await db.select().from(zones).where(eq(zones.farmId, input.farmId));
      const allCrops = await db.select().from(crops);

      const events: Array<{ date: Date; title: string; type: 'planting' | 'maintenance' | 'harvest' }> = [];

      // Map manual activities
      for (const act of farmActivities) {
        events.push({
          date: act.activityDate,
          title: act.type === 'irrigation' ? 'Irrigation' : 
                 act.type === 'fertilization' ? 'Apply Fertilizer' :
                 act.type === 'pestControl' ? 'Pest Control' :
                 act.type === 'labor' ? 'Farm Labor' : 'Maintenance',
          type: 'maintenance'
        });
      }

      // Map manual harvests
      for (const harv of farmHarvests) {
        events.push({
          date: harv.harvestDate,
          title: `Harvest (Manual)`,
          type: 'harvest'
        });
      }

      // Map planting plans (automated)
      for (const plan of farmPlans) {
        const zone = farmZones.find(z => z.id === plan.zoneId);
        if (!zone || !plan.createdAt) continue;
        
        // Parse crops from prdpLabel (e.g. "Ampalaya_Kalabasa (60-40)")
        let cropNames: string[] = [];
        if (zone.prdpLabel) {
          const base = zone.prdpLabel.split(' (')[0];
          cropNames = base.split('_');
        } else if (zone.name) {
           cropNames = [zone.name];
        }

        for (const cName of cropNames) {
          const crop = allCrops.find(c => c.name.toLowerCase() === cName.toLowerCase());
          
          events.push({
            date: plan.createdAt,
            title: `Plant ${cName}`,
            type: 'planting'
          });

          if (crop && crop.maturationDays) {
            const harvestDate = new Date(plan.createdAt);
            harvestDate.setDate(harvestDate.getDate() + crop.maturationDays);
            events.push({
              date: harvestDate,
              title: `Expected ${cName} Harvest`,
              type: 'harvest'
            });
          }
        }
      }

      return events.sort((a, b) => a.date.getTime() - b.date.getTime());
    }),

  // Planting Plans
  listPlansByFarm: protectedProcedure
    .input(z.object({ farmId: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      return db.select().from(plantingPlans).where(eq(plantingPlans.farmId, input.farmId));
    }),

  createPlan: protectedProcedure
    .input(z.object({
      zoneId: z.number(),
      farmId: z.number(),
      layoutConfig: z.any().optional(),
      projectedYield: z.number().optional(),
      lerScore: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const [result] = await db.insert(plantingPlans).values({
        zoneId: input.zoneId,
        farmId: input.farmId,
        layoutConfig: input.layoutConfig,
        projectedYield: input.projectedYield?.toString(),
        lerScore: input.lerScore?.toString(),
      });
      return { id: result.insertId };
    }),

  updatePlan: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["planned", "active", "harvested"]).optional(),
      layoutConfig: z.any().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const plan = await db.query.plantingPlans.findFirst({
        where: eq(plantingPlans.id, input.id)
      });
      if (!plan) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, plan.farmId)
      });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.update(plantingPlans)
        .set({
          status: input.status,
          layoutConfig: input.layoutConfig,
        })
        .where(eq(plantingPlans.id, input.id));

      return { success: true };
    }),

  // Harvests
  listHarvestsByFarm: protectedProcedure
    .input(z.object({ farmId: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      return db.select().from(harvests).where(eq(harvests.farmId, input.farmId));
    }),

  listHarvestsByPlan: protectedProcedure
    .input(z.object({ planId: z.number() }))
    .query(async ({ input, ctx }) => {
      const plan = await db.query.plantingPlans.findFirst({
        where: eq(plantingPlans.id, input.planId)
      });
      if (!plan) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, plan.farmId)
      });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      return db.select().from(harvests).where(eq(harvests.planId, input.planId));
    }),

  createHarvest: protectedProcedure
    .input(z.object({
      farmId: z.number(),
      zoneId: z.number().optional(),
      cropId: z.number().optional(),
      harvestDate: z.string(),
      yieldKg: z.number(),
      pricePerKg: z.number().optional(),
      revenue: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const [result] = await db.insert(harvests).values({
        farmId: input.farmId,
        zoneId: input.zoneId,
        cropId: input.cropId,
        harvestDate: new Date(input.harvestDate),
        yieldKg: input.yieldKg.toString(),
        pricePerKg: input.pricePerKg?.toString(),
        revenue: input.revenue?.toString(),
        notes: input.notes,
      });
      return { id: result.insertId };
    }),

  deleteHarvest: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const harvest = await db.query.harvests.findFirst({ where: eq(harvests.id, input.id) });
      if (!harvest) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({ where: eq(farms.id, harvest.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.delete(harvests).where(eq(harvests.id, input.id));
      return { success: true };
    }),

  // Activities
  listActivitiesByFarm: protectedProcedure
    .input(z.object({ farmId: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      return db.select().from(activities).where(eq(activities.farmId, input.farmId));
    }),

  createActivity: protectedProcedure
    .input(z.object({
      farmId: z.number(),
      zoneId: z.number().optional(),
      activityDate: z.string(),
      type: z.enum(["labor", "irrigation", "fertilization", "pestControl", "harvesting", "other"]),
      description: z.string().optional(),
      laborCost: z.number().optional(),
      materialCost: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const totalCost = (input.laborCost || 0) + (input.materialCost || 0);

      const [result] = await db.insert(activities).values({
        farmId: input.farmId,
        zoneId: input.zoneId,
        activityDate: new Date(input.activityDate),
        type: input.type,
        description: input.description,
        laborCost: input.laborCost?.toString() || "0",
        materialCost: input.materialCost?.toString() || "0",
        totalCost: totalCost.toString(),
      });
      return { id: result.insertId };
    }),

  deleteActivity: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const activity = await db.query.activities.findFirst({ where: eq(activities.id, input.id) });
      if (!activity) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({ where: eq(farms.id, activity.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.delete(activities).where(eq(activities.id, input.id));
      return { success: true };
    }),

  // Plan Health Score (50% Growth + 30% Issues + 20% Calendar Adherence)
  getPlanHealthScore: protectedProcedure
    .input(z.object({ planId: z.number() }))
    .query(async ({ input, ctx }) => {
      const plan = await db.query.plantingPlans.findFirst({
        where: eq(plantingPlans.id, input.planId)
      });
      if (!plan) throw new TRPCError({ code: "NOT_FOUND" });

      // Fetch zone to know the crops
      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, plan.zoneId)
      });
      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });

      // Identify crops from zone label
      let maxMaturation = 60; // fallback
      if (zone.prdpLabel) {
        const cropNames = zone.prdpLabel.split(' (')[0].split('_');
        const allCrops = await db.select().from(crops);
        let longest = 0;
        cropNames.forEach(cName => {
          const c = allCrops.find(x => x.name.toLowerCase() === cName.toLowerCase());
          if (c && c.maturationDays && c.maturationDays > longest) {
            longest = c.maturationDays;
          }
        });
        if (longest > 0) maxMaturation = longest;
      }

      // Calculate 50% Growth Component
      // Based on time elapsed since planting vs maturation days
      const daysElapsed = Math.floor((new Date().getTime() - new Date(plan.createdAt || new Date()).getTime()) / (1000 * 3600 * 24));
      let growthScore = (daysElapsed / maxMaturation) * 50;
      if (growthScore > 50) growthScore = 50; // max out at 50 points
      if (growthScore < 0) growthScore = 0;

      // Calculate 30% Issues Component
      // Start with 30 points, deduct points for pest/disease activities
      let issuesScore = 30;
      const relatedActivities = await db.select().from(activities).where(eq(activities.zoneId, plan.zoneId));
      
      const pestControlCount = relatedActivities.filter(a => a.type === 'pestControl').length;
      issuesScore -= (pestControlCount * 10);
      if (issuesScore < 0) issuesScore = 0;

      // Calculate 20% Calendar Adherence
      // Ratio of planned vs executed (simplified: we just check if they have done maintenance)
      let calendarScore = 0;
      const maintenanceCount = relatedActivities.filter(a => ['irrigation', 'fertilization', 'labor'].includes(a.type)).length;
      
      // Assume they need at least 2 maintenance activities per month elapsed
      const expectedMaintenance = Math.max(1, Math.floor(daysElapsed / 15));
      calendarScore = (maintenanceCount / expectedMaintenance) * 20;
      if (calendarScore > 20) calendarScore = 20;

      const totalScore = Math.round(growthScore + issuesScore + calendarScore);

      return {
        totalScore,
        breakdown: {
          growth: Math.round(growthScore),
          issues: Math.round(issuesScore),
          calendar: Math.round(calendarScore)
        },
        metrics: {
          daysElapsed,
          maxMaturation,
          pestControlCount,
          maintenanceCount
        }
      };
    }),
});
