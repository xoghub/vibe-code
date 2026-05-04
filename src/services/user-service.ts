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

export const getUserProfile = async (userId: number) => {

  const userRecords = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userRecords.length === 0 || !userRecords) {
    throw new Error("User Record Not Found");
  }

  // Destructure to exclude password and other sensitive fields
  const { password, createdAt, ...profile } = userRecords[0];
  return profile;
};
