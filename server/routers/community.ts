import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { communityPosts, communityComments, users } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const communityRouter = router({
  listPosts: publicProcedure
    .input(z.object({ category: z.enum(["pestControl", "harvest", "general", "market", "weather"]).optional() }))
    .query(async ({ input }) => {
      let query = db.select({
        post: communityPosts,
        author: {
          id: users.id,
          name: users.name,
          role: users.role,
        }
      })
        .from(communityPosts)
        .innerJoin(users, eq(communityPosts.authorId, users.id));

      if (input.category) {
        query = query.where(eq(communityPosts.category, input.category)) as any;
      }

      const results = await query.orderBy(desc(communityPosts.createdAt));
      return results;
    }),

  createPost: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      category: z.enum(["pestControl", "harvest", "general", "market", "weather"]),
      imageUrl: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [result] = await db.insert(communityPosts).values({
        authorId: ctx.user.id,
        title: input.title,
        content: input.content,
        category: input.category,
        imageUrl: input.imageUrl,
      });
      return { id: result.insertId };
    }),

  listComments: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      return db.select({
        comment: communityComments,
        author: {
          id: users.id,
          name: users.name,
          role: users.role,
        }
      })
        .from(communityComments)
        .innerJoin(users, eq(communityComments.authorId, users.id))
        .where(eq(communityComments.postId, input.postId))
        .orderBy(communityComments.createdAt);
    }),

  createComment: protectedProcedure
    .input(z.object({
      postId: z.number(),
      content: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const [result] = await db.insert(communityComments).values({
        postId: input.postId,
        authorId: ctx.user.id,
        content: input.content,
      });
      return { id: result.insertId };
    }),
});
