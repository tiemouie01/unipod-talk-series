import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { event } from "./event";
import { speaker } from "./speaker";

export const eventSpeakers = pgTable(
  "event_speakers",
  {
    eventId: uuid("event_id")
      .notNull()
      .references(() => event.id),
    speakerId: uuid("speaker_id")
      .notNull()
      .references(() => speaker.id),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.speakerId] })],
);

export const eventSpeakersRelations = relations(eventSpeakers, ({ one }) => ({
  event: one(event, {
    fields: [eventSpeakers.eventId],
    references: [event.id],
  }),
  speaker: one(speaker, {
    fields: [eventSpeakers.speakerId],
    references: [speaker.id],
  }),
}));
