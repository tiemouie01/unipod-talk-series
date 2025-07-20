import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { eventSpeakers } from "./event-speakers";

export const speaker = pgTable("speaker", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  title: text("title").notNull(),
});

export const speakerRelations = relations(speaker, ({ many }) => ({
  eventSpeakers: many(eventSpeakers),
}));
