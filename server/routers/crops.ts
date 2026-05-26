import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { crops } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const cropsRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(crops).orderBy(crops.name);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.query.crops.findFirst({
        where: eq(crops.id, input.id),
      });
    }),
});
