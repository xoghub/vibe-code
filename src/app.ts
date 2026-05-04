import { Elysia } from "elysia";
import { userRouter } from "./routes/user-router";
import { authRouter } from "./routes/auth-router";

const app = new Elysia()
  .use(userRouter)
  .use(authRouter)
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
