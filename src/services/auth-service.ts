import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../models/user-model";
import { session } from "../models/session-model";
import { verifyPassword } from "../utils/user-utils";
import { generateTokens } from "../utils/jwt-utils";

export const loginUser = async (data: any) => {
  // Find user by email
  const userRecords = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
  
  if (userRecords.length === 0) {
    throw new Error("User or Password is not valid");
  }

  const user = userRecords[0];

  // Verify password
  const isPasswordValid = await verifyPassword(data.password, user.password);
  
  if (!isPasswordValid) {
    throw new Error("User or Password is not valid");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens();

  // Calculate expiredAt (e.g. 24 hours from now)
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);

  // Save session
  await db.insert(session).values({
    userId: user.id,
    email: user.email,
    accessToken,
    refreshToken,
    expiredAt,
  });

  return { accessToken, refreshToken };
};
