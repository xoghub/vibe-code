import { mysqlTable, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./user-model";

export const session = mysqlTable("session", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").references(() => users.id).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  accessToken: varchar("access_token", { length: 255 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  expiredAt: timestamp("expired_at").defaultNow(),
});
