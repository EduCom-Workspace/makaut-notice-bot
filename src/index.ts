import { Context, Hono } from "hono";
import { handelTgCallback } from "./controllers/handelTgCallback";
import { logger } from "hono/logger";
import { checkNewNotices } from "./controllers/handelNotices";

// Define Bindings type for environment variables
export type Env = {
  DB: D1Database;
  TG_TOKEN: string;
};

// Create a Hono app with typed Env
const app = new Hono<{ Bindings: Env }>();

app.use(logger());

// Simple test route
app.get("/", (c: Context) => {
  return c.json({
    message: "Hello from Hono!",
    timestamp: new Date().toISOString(),
    bindings: {
      TG_TOKEN: c.env.TG_TOKEN,
    },
  });
});

// Handle Telegram callbacks for GET and POST methods
app.on(["GET", "POST"], "/tg/callback", handelTgCallback);

app.get("/checkNotices", async (c: Context) => {
  const res = await checkNewNotices(c);
  return c.json(res);
});

app.get("/test", async (c: Context) => {
  const lastNotices = await c.env.DB.prepare(
    "SELECT * FROM LastNotices ORDER BY noticeid DESC LIMIT 2"
  ).all();
  // console.log(lastNotices);
  return c.json(lastNotices.results);
});

// Export fetch and scheduled handlers
export default {
  fetch: app.fetch,

  // Scheduled function for cron jobs
  async scheduled(_event: any, env: Env, _ctx: Context) {
    console.log("Cron job triggered at:", new Date().toISOString());
    // Example async task
    const result = await checkNewNotices(_ctx);
    // console.log(result);
  },
};
