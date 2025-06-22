import { pgTable, text, timestamp, uuid, pgEnum, boolean } from "drizzle-orm/pg-core";
import { event } from "./event";
import { user } from "./auth-schema";
import { seat } from "./seat";

const status = pgEnum("status", ["pending", "active", "cancelled"])
export const reservation = pgTable("reservation", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id),
    eventId: uuid("event_id").notNull().references(() => event.id),
    seatId: uuid("seat_id").notNull().references(() => seat.id),
    status: status("status").notNull().default("active"),
    isLuckyDraw: boolean("is_lucky_draw").notNull().default(false),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})