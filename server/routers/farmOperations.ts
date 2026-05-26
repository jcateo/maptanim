import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { plantingPlans, harvests, activities, farms } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const farmOperationsRouter = router({
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
});
