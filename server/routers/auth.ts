import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user || null;
  }),

  register: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["farmer", "extension_officer", "admin"]),
      municipality: z.string().optional(),
      barangay: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);

      const [result] = await db.insert(users).values({
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role,
        municipality: input.municipality,
        barangay: input.barangay,
      });

      const user = await db.query.users.findFirst({
        where: eq(users.id, result.insertId),
      });

      if (user && ctx.req.session) {
        ctx.req.session.userId = user.id;
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }

      return null;
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      if (ctx.req.session) {
        ctx.req.session.userId = user.id;
      }

      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    return new Promise((resolve, reject) => {
      if (ctx.req.session) {
        ctx.req.session.destroy((err) => {
          if (err) reject(new TRPCError({ code: "INTERNAL_SERVER_ERROR" }));
          resolve({ success: true });
        });
      } else {
        resolve({ success: true });
      }
    });
  }),
});
