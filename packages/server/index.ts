import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { appRouter, AppRouter } from "./router";
import { migrateWatch } from "./db/migrate";
import { Server } from "bun";
import { run } from "graphile-worker";
import { taskList } from "./tasks";
import { pool } from "./db/connection";

if (process.env.NODE_ENV === "development") {
  migrateWatch();
}

const app = new Hono<{ Bindings: { server: Server } }>();

app.get("/health", (c) => {
  return c.json({ status: "ok2" });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

export { type AppRouter };

Bun.serve({
  port: 3000,
  fetch: (request, server) => {
    return app.fetch(request, { server });
  },
});

run({
  taskList,
  pgPool: pool,
})
  .then(() => {
    console.log("graphile-worker is running");
  })
  .catch((e) => {
    console.error("graphile-worker failed to start");
    console.error(e);
  });
