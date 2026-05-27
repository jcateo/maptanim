import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { companionPairs, crops, zones } from "../../drizzle/schema";
import { eq, or } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const companionRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(companionPairs);
  }),

  getForCrop: publicProcedure
    .input(z.object({ cropId: z.number() }))
    .query(async ({ input }) => {
      return db.select()
        .from(companionPairs)
        .where(or(
          eq(companionPairs.crop1Id, input.cropId),
          eq(companionPairs.crop2Id, input.cropId)
        ));
    }),

  analyzeZone: publicProcedure
    .input(z.object({ zoneId: z.number() }))
    .query(async ({ input }) => {
      const zone = await db.query.zones.findFirst({
        where: eq(zones.id, input.zoneId)
      });
      if (!zone) throw new TRPCError({ code: "NOT_FOUND" });

      const allPairs = await db.select().from(companionPairs);

      // Parse elevation and slope from notes
      let elevation = 0;
      let slope = 0;
      if (zone.notes) {
        const elMatch = zone.notes.match(/Elevation: (\d+)m/);
        if (elMatch) elevation = parseInt(elMatch[1]);
        const slMatch = zone.notes.match(/Slope: (\d+)%/);
        if (slMatch) slope = parseInt(slMatch[1]);
      }

      // Apply Rule Engine
      return allPairs.map(pair => {
        let scoreModifier = 0;
        let baseScore = pair.compatibility === 'excellent' ? 90 : (pair.compatibility === 'good' ? 70 : 40);

        // Rule 1: Steep Slope Penalty
        if (slope > 15) scoreModifier -= 15;
        else if (slope > 8) scoreModifier -= 5;

        // Rule 2: Soil Synergy (Mock logic based on PRDP)
        if (zone.soilType && zone.soilType.toLowerCase().includes("loam")) {
          scoreModifier += 10;
        }

        let finalScore = Math.min(100, Math.max(0, baseScore + scoreModifier));
        let adjustedCompatibility = finalScore >= 85 ? 'excellent' : (finalScore >= 60 ? 'good' : 'poor');

        return {
          ...pair,
          adjustedCompatibility,
          finalScore,
          scoreModifier
        };
      });
    }),
});
