import { pgTable,uuid,timestamp} from "drizzle-orm/pg-core";
import { event } from "./event";

export const LuckyDraw = pgTable("lucky_draw", {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").notNull().references(() => event.id),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})