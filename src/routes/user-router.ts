import { Elysia, t } from "elysia";
import { registerUserController } from "../controllers/user-controller";

export const userRouter = new Elysia()
  .post("/register", registerUserController, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  });
