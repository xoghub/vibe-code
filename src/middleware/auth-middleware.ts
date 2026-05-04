import { Elysia } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { session } from "../models/session-model";

export const authMiddleware = (app: Elysia) => 
  app
    .derive(async ({ request }) => {
      const authHeader = request.headers.get("Authorization");
      
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
          userId: null,
          authMessage: "Missing or invalid Authorization header"
        };
      }

      const token = authHeader.replace("Bearer ", "").trim();

      // Find session
      const sessionRecords = await db
        .select()
        .from(session)
        .where(eq(session.accessToken, token))
        .limit(1);

      if (sessionRecords.length === 0) {
        return {
          userId: null,
          accessToken: null,
          authMessage: "Session not found in database for this token"
        };
      }

      return {
        userId: sessionRecords[0].userId,
        accessToken: token,
        authMessage: 'User authenticated successfully'
      };
    })
    .onBeforeHandle(({ userId, authMessage, set }) => {
      if (!userId) {
        set.status = 401;
        return {
          message: authMessage
        };
      }
    });
