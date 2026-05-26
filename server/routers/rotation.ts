import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { rotationCompatibility, crops } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const rotationRouter = router({
  getRecommendation: publicProcedure
    .input(z.object({ previousCropId: z.number() }))
    .query(async ({ input }) => {
      const recommendations = await db.select({
        rating: rotationCompatibility.rating,
        reason: rotationCompatibility.reason,
        crop: crops,
      })
        .from(rotationCompatibility)
        .innerJoin(crops, eq(rotationCompatibility.nextCropId, crops.id))
        .where(eq(rotationCompatibility.previousCropId, input.previousCropId));

      // Sort by rating: excellent -> good -> poor
      return recommendations.sort((a, b) => {
        const order = { excellent: 1, good: 2, poor: 3 };
        return order[a.rating] - order[b.rating];
      });
    }),

  getMatrix: publicProcedure.query(async () => {
    return db.select().from(rotationCompatibility);
  }),
});
