import { pgTable, uuid, timestamp, text,  } from "drizzle-orm/pg-core";
import { event } from "./event";
import { user } from "./auth-schema";
import { LuckyDraw } from "./lucky-draw";

export const luckyDrawWinners = pgTable("lucky_draw_winners",{
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").notNull().references(() => event.id),
    luckyDrawId: uuid("lucky_draw_id").notNull().references(() => LuckyDraw.id),
    userId: text("user_id").notNull().references(() => user.id),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})