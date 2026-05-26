import { router, publicProcedure } from "./trpc";
import { authRouter } from "./routers/auth";
import { farmsRouter } from "./routers/farms";
import { zonesRouter } from "./routers/zones";
import { cropsRouter } from "./routers/crops";
import { rotationRouter } from "./routers/rotation";
import { companionRouter } from "./routers/companion";
import { farmOperationsRouter } from "./routers/farmOperations";
import { officerRouter } from "./routers/officer";
import { adminRouter } from "./routers/admin";
import { communityRouter } from "./routers/community";
import { notificationsRouter } from "./routers/notifications";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),
  auth: authRouter,
  farms: farmsRouter,
  zones: zonesRouter,
  crops: cropsRouter,
  rotation: rotationRouter,
  companion: companionRouter,
  farmOps: farmOperationsRouter,
  officer: officerRouter,
  admin: adminRouter,
  community: communityRouter,
  notifications: notificationsRouter,
});

export type AppRouter = typeof appRouter;
