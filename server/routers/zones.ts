import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { zones, zoneVerifications, farms, users, notifications } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import * as turf from "@turf/turf";
import { fetchBiophysicalProfile } from "../services/externalApis";

export const zonesRouter = router({
  listByFarm: protectedProcedure
    .input(z.object({ farmId: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      return db.select().from(zones).where(eq(zones.farmId, input.farmId));
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.id),
      });
      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });
      return zone;
    }),

  create: protectedProcedure
    .input(z.object({
      farmId: z.number(),
      name: z.string().optional(),
      geometry: z.any(),
      areaHectares: z.number(),
      croppingSystem: z.enum(["monocrop", "intercrop", "rotation"]),
      prdpLabel: z.string().optional(),
      cropBreakdown: z.any().optional(),
      photoUrls: z.array(z.string()).optional(),
      soilType: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.farmId) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      let profileNotes = input.notes || "";
      let resolvedSoilType = input.soilType || "";

      try {
        if (input.geometry && input.geometry.type) {
          // Use turf to get the center of the drawn polygon
          const center = turf.center(input.geometry);
          const [lon, lat] = center.geometry.coordinates;

          // Fetch real data from external scientific APIs
          const profile = await fetchBiophysicalProfile(lat, lon);

          resolvedSoilType = profile.soilType;

          const profileDetails = [
            `Biophysical Profile: ${profile.profileName}`,
            `Soil pH: ${profile.soilPh.toFixed(1)}`,
            `Avg Temp: ${profile.temp}°C`,
            `Sunlight: ${profile.sunlightHours} hrs/day`,
            `Rainfall: ${profile.rainfall}mm/hr`,
            `Elevation: ${profile.elevation}m`,
            `Slope: ${profile.slope}%`,
          ].join('\\n');

          profileNotes = profileNotes ? `${profileDetails}\\n\\n${profileNotes}` : profileDetails;
        }
      } catch (e) {
        console.error("Failed to process API integration", e);
      }

      // Create Zone
      const [result] = await db.insert(zones).values({
        farmId: input.farmId,
        name: input.name,
        geometry: input.geometry,
        areaHectares: input.areaHectares.toString(),
        croppingSystem: input.croppingSystem,
        prdpLabel: input.prdpLabel,
        cropBreakdown: input.cropBreakdown,
        photoUrls: input.photoUrls,
        soilType: resolvedSoilType,
        notes: profileNotes,
        verificationStatus: "pending",
      });

      // Find an officer in the same municipality to assign verification
      const officer = await db.query.users.findFirst({
        where: and(
          eq(users.role, "extension_officer"),
          eq(users.municipality, farm.municipality)
        )
      });

      if (officer) {
        await db.insert(zoneVerifications).values({
          zoneId: result.insertId,
          officerId: officer.id,
          farmerId: ctx.user.id,
          status: "pending",
        });

        await db.insert(notifications).values({
          userId: officer.id,
          title: "New Zone Verification",
          body: `Farmer ${ctx.user.name} has submitted a new zone for verification.`,
          link: "/dashboard",
        });
      }

      return { id: result.insertId };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      geometry: z.any().optional(),
      areaHectares: z.number().optional(),
      croppingSystem: z.enum(["monocrop", "intercrop", "rotation"]).optional(),
      prdpLabel: z.string().optional(),
      cropBreakdown: z.any().optional(),
      photoUrls: z.array(z.string()).optional(),
      soilType: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.id)
      });
      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, zone.farmId)
      });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.update(zones).set({
        name: input.name,
        geometry: input.geometry,
        areaHectares: input.areaHectares?.toString(),
        croppingSystem: input.croppingSystem,
        prdpLabel: input.prdpLabel,
        cropBreakdown: input.cropBreakdown,
        photoUrls: input.photoUrls,
        soilType: input.soilType,
        notes: input.notes,
        verificationStatus: "pending",
      }).where(eq(zones.id, input.id));

      // Reset verification to pending
      const verification = await db.query.zoneVerifications.findFirst({
        where: eq(zoneVerifications.zoneId, input.id)
      });

      if (verification) {
        await db.update(zoneVerifications)
          .set({ status: "pending" })
          .where(eq(zoneVerifications.id, verification.id));
      } else {
        const officer = await db.query.users.findFirst({
          where: and(
            eq(users.role, "extension_officer"),
            eq(users.municipality, farm.municipality)
          )
        });

        if (officer) {
          await db.insert(zoneVerifications).values({
            zoneId: input.id,
            officerId: officer.id,
            farmerId: ctx.user.id,
            status: "pending",
          });
        }
      }

      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.id)
      });
      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, zone.farmId)
      });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.delete(zoneVerifications).where(eq(zoneVerifications.zoneId, input.id));
      await db.delete(zones).where(eq(zones.id, input.id));

      return { success: true };
    }),
});
