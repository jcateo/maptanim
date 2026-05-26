import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { farms, zones, plantingPlans } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const farmsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    // Basic list for farmer
    return db.select().from(farms).where(eq(farms.userId, ctx.user.id));
  }),

  listWithDetails: protectedProcedure.query(async ({ ctx }) => {
    // Used in dashboard to show zone counts etc.
    const userFarms = await db.query.farms.findMany({
      where: eq(farms.userId, ctx.user.id)
    });

    const farmsWithZones = await Promise.all(userFarms.map(async (f) => {
      const fZones = await db.query.zones.findMany({ where: eq(zones.farmId, f.id) });
      return {
        ...f,
        zoneCount: fZones.length,
        zones: fZones
      };
    }));

    return farmsWithZones;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, input.id),
      });

      if (!farm) throw new TRPCError({ code: "NOT_FOUND" });
      if (farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const farmZones = await db.query.zones.findMany({
        where: eq(zones.farmId, input.id),
      });

      return { ...farm, zones: farmZones };
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      municipality: z.string().min(1),
      barangay: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [result] = await db.insert(farms).values({
        userId: ctx.user.id,
        name: input.name,
        municipality: input.municipality,
        barangay: input.barangay,
        latitude: input.latitude?.toString(),
        longitude: input.longitude?.toString(),
      });

      return { id: result.insertId };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      status: z.enum(["active", "inactive"]).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const farm = await db.query.farms.findFirst({ where: eq(farms.id, input.id) });
      if (!farm || farm.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      await db.update(farms)
        .set({
          name: input.name,
          status: input.status,
        })
        .where(eq(farms.id, input.id));

      return { success: true };
    }),
});
