import { Elysia, t } from "elysia";
import { registerUserController, getCurrentUserController } from "../controllers/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const userRouter = new Elysia()
  .post("/register", registerUserController, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  })
  .use(authMiddleware)
  .get("/getProfile", getCurrentUserController);
