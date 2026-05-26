import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { zoneVerifications, zones, farms, users, notifications } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const officerRouter = router({
  verificationQueue: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "extension_officer") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return db.select({
      verification: zoneVerifications,
      zone: zones,
      farm: farms,
      farmer: users,
    })
      .from(zoneVerifications)
      .innerJoin(zones, eq(zoneVerifications.zoneId, zones.id))
      .innerJoin(farms, eq(zones.farmId, farms.id))
      .innerJoin(users, eq(zoneVerifications.farmerId, users.id))
      .where(and(
        eq(zoneVerifications.officerId, ctx.user.id),
        eq(zoneVerifications.status, "pending")
      ));
  }),

  verifyZone: protectedProcedure
    .input(z.object({
      zoneId: z.number(),
      action: z.enum(["approve", "reject"]),
      correctionNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "extension_officer") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const verification = await db.query.zoneVerifications.findFirst({
        where: and(
          eq(zoneVerifications.zoneId, input.zoneId),
          eq(zoneVerifications.officerId, ctx.user.id)
        ),
      });

      if (!verification) throw new TRPCError({ code: "NOT_FOUND" });

      const newStatus = input.action === "approve" ? "verified" : "needs_correction";
      const verifStatus = input.action === "approve" ? "approved" : "needs_correction";

      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.zoneId),
      });

      // Update zone status
      await db.update(zones)
        .set({ verificationStatus: newStatus })
        .where(eq(zones.id, input.zoneId));

      // Update verification record
      await db.update(zoneVerifications)
        .set({
          status: verifStatus,
          correctionNotes: input.correctionNotes,
          verifiedAt: new Date(),
        })
        .where(eq(zoneVerifications.id, verification.id));

      // Create notification for farmer
      const title = input.action === "approve" ? "Zone Verified" : "Correction Requested";
      const body = input.action === "approve"
        ? "Your zone has been verified by an extension officer."
        : `Correction requested for your zone: ${input.correctionNotes}`;

      await db.insert(notifications).values({
        userId: verification.farmerId,
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
