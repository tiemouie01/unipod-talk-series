import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";
import { eventSpeakers } from "./event-speakers";

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  eventDate: timestamp("event_date").notNull(),
  registrationStartDate: timestamp("registration_start_date"),
  registrationEndDate: timestamp("registration_end_date"),
  bannerURL: text(),
  luckyDrawEnabled: boolean("lucky_draw_enabled").notNull(),
  createdBy: text().references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const eventRelations = relations(event, ({ many }) => ({
  eventSpeakers: many(eventSpeakers),
}));
