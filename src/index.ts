import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => "Hello Elysia + Bun!")
  .get("/users", async () => {
    return await db.select().from(users);
  })
  .post("/users", async ({ body }) => {
    return await db.insert(users).values(body as { name: string, email: string });
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
