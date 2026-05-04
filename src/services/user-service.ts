import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../models/user-model";
import { hashPassword } from "../utils/user-utils";

export const registerUser = async (data: any) => {
  // Check if user exists
  const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
  
  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Insert user
  await db.insert(users).values({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
};
