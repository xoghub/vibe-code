import { Elysia } from "elysia";
import { userRouter } from "./routes/user-router";

const app = new Elysia()
  .use(userRouter)
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
