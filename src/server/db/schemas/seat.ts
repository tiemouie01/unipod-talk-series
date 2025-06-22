import { pgTable, uuid, timestamp, text, boolean } from "drizzle-orm/pg-core";
import { event } from "./event";
import { user } from "./auth-schema";

export const seat = pgTable("seat", {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").notNull().references(() => event.id),
    userId: text("user_id").references(() => user.id),
    seatLabel: text("seat_label").notNull(),
    isReserved: boolean("is_reserved").notNull().default(false),
    isLuckyDraw: boolean("is_lucky_draw").notNull().default(false),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})
    