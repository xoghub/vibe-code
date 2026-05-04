import { Elysia, t } from "elysia";
import { loginController } from "../controllers/auth-controller";

export const authRouter = new Elysia()
  .post("/login", loginController, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  });
