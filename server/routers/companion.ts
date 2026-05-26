import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { companionPairs, crops } from "../../drizzle/schema";
import { eq, or } from "drizzle-orm";

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
});
