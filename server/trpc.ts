import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";
import { db } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  let user = null;

  if (req.session && req.session.userId) {
    const found = await db.query.users.findFirst({
      where: eq(users.id, req.session.userId),
    });
    if (found) {
      const { passwordHash, ...userWithoutPassword } = found;
      user = userWithoutPassword;
    }
  }

  return { req, res, user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

