import { Elysia, t } from "elysia";
import { loginController, logoutController } from "../controllers/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const authRouter = new Elysia()
  .post("/login", loginController, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .use(authMiddleware)
  .post("/logout", logoutController);
