import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { users, farms, zones, zoneVerifications, harvests, activities } from "../../drizzle/schema";
import { eq, sum } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  users: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.select().from(users);
    }),

    updateRole: protectedProcedure
      .input(z.object({
        userId: z.number(),
        role: z.enum(["farmer", "extension_officer", "admin"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
        return { success: true };
      }),
  }),

  farms: router({
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const allFarms = await db.query.farms.findMany({
        with: {
          zones: true
        }
      });
      return allFarms;
    }),
  }),

  stats: router({
    overview: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });

      const allUsers = await db.query.users.findMany();
      const allFarms = await db.query.farms.findMany();
      const allZones = await db.query.zones.findMany();
      const allVerifications = await db.query.zoneVerifications.findMany({ where: eq(zoneVerifications.status, "pending") });

      return {
        totalUsers: allUsers.length,
        farmers: allUsers.filter(u => u.role === "farmer").length,
        officers: allUsers.filter(u => u.role === "extension_officer").length,
        totalFarms: allFarms.length,
        totalZones: allZones.length,
        verifiedZones: allZones.filter(z => z.verificationStatus === "verified").length,
        pendingVerifications: allVerifications.length,
      };
    }),

    analytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });

      const revenueResult = await db.select({ total: sum(harvests.revenue) }).from(harvests);
      const costsResult = await db.select({ total: sum(activities.totalCost) }).from(activities);

      return {
        totalRevenue: revenueResult[0]?.total || "0",
        totalCosts: costsResult[0]?.total || "0",
      };
    }),
  }),
});
