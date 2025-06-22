import { pgTable, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { event } from "./event";
import { user } from "./auth-schema";

const activityType = pgEnum("activity_type", ["create_event", "delete_event", "update_event","create_lucky_draw","delete_lucky_draw","update_lucky_draw","create_reservation","delete_reservation","update_reservation"])
export const eventActivityLog = pgTable("event_activity_log",{
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").notNull().references(() => event.id),
    userId: uuid("user_id").notNull().references(() => user.id),
    activityType: activityType("activity_type").notNull(),
    createdAt: timestamp("created_at").notNull(),
})