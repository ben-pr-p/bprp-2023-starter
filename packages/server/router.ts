import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "./db/db";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  }),
  listThings: publicProcedure.query(async ({ input }) => {
    return await db.selectFrom("things").selectAll().execute();
  }),
});

export type AppRouter = typeof appRouter;
