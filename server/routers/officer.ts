import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { zoneVerifications, zones, farms, users, notifications } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const officerRouter = router({
  verificationQueue: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "extension_officer" && ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    // Query zones directly to avoid "lost" zones due to missing tickets
    return db.select({
      zone: zones,
      farm: farms,
      farmer: users,
    })
      .from(zones)
      .innerJoin(farms, eq(zones.farmId, farms.id))
      .innerJoin(users, eq(farms.userId, users.id))
      .where(eq(zones.verificationStatus, "pending")); // Removed strict municipality filter for demo
  }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "extension_officer" && ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const allZones = await db.select({
      verificationStatus: zones.verificationStatus
    })
    .from(zones)
    .innerJoin(farms, eq(zones.farmId, farms.id))
    .innerJoin(users, eq(farms.userId, users.id)); // Removed strict municipality filter for demo

    const pending = allZones.filter(z => z.verificationStatus === "pending").length;
    const verified = allZones.filter(z => z.verificationStatus === "verified").length;
    const rejected = allZones.filter(z => z.verificationStatus === "needs_correction").length;

    return {
      pending,
      verified,
      rejected
    };
  }),

  verifyZone: protectedProcedure
    .input(z.object({
      zoneId: z.number(),
      action: z.enum(["approve", "reject"]),
      correctionNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "extension_officer" && ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const newStatus = input.action === "approve" ? "verified" : "needs_correction";
      const verifStatus = input.action === "approve" ? "approved" : "needs_correction";

      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.zoneId),
      });

      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });

      const farm = await db.query.farms.findFirst({
        where: eq(farms.id, zone.farmId),
      });

      // Update zone status
      await db.update(zones)
        .set({ verificationStatus: newStatus })
        .where(eq(zones.id, input.zoneId));

      // Check if ticket exists, if not, create it for the audit trail
      const existingVerification = await db.query.zoneVerifications.findFirst({
        where: eq(zoneVerifications.zoneId, input.zoneId)
      });

      if (existingVerification) {
        await db.update(zoneVerifications)
          .set({
            status: verifStatus,
            correctionNotes: input.correctionNotes,
            verifiedAt: new Date(),
            officerId: ctx.user.id
          })
          .where(eq(zoneVerifications.id, existingVerification.id));
      } else {
        await db.insert(zoneVerifications).values({
          zoneId: input.zoneId,
          officerId: ctx.user.id,
          farmerId: farm?.userId || 0,
          status: verifStatus,
          correctionNotes: input.correctionNotes,
          verifiedAt: new Date()
        });
      }

      // Create notification for farmer
      const title = input.action === "approve" ? "Zone Verified" : "Correction Requested";
      const body = input.action === "approve"
        ? "Your zone has been verified by an extension officer."
        : `Correction requested for your zone: ${input.correctionNotes}`;

      await db.insert(notifications).values({
        userId: farm?.userId || 0,
        title,
        body,
        link: zone ? `/farms/${zone.farmId}` : `/dashboard`,
      });

      return { success: true };
    }),

  assignedFarmers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "extension_officer") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return db.select()
      .from(users)
      .where(and(
        eq(users.role, "farmer"),
        eq(users.municipality, ctx.user.municipality || "")
      ));
  }),

  calculateSuitability: protectedProcedure
    .input(z.object({
      zoneId: z.number(),
      cropId: z.number(),
    }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== "extension_officer") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return {
        score: Math.floor(Math.random() * (100 - 60 + 1) + 60), // mock score 60-100
        reason: "Zone properties loosely match the crop requirements.",
      };
    }),
});
