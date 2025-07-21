import type { CreateEventValues, UpdateEventValues } from "@/types/events";
import { db } from ".";
import {
  event,
  seat,
  eventActivityLog,
  speaker,
  eventSpeakers,
} from "./schema";
import { eq } from "drizzle-orm";

export const createEvent = async function (values: CreateEventValues) {
  try {
    const eventTransactiondata = await db.transaction(async (tx) => {
      try {
        const eventData = await tx
          .insert(event)
          .values({
            title: values.title,
            description: values.description,
            location: values.location,
            eventDate: new Date(values.eventDate),
            registrationStartDate: new Date(values.registrationStartDate),
            registrationEndDate: new Date(values.registrationEndDate),
            bannerURL: values.bannerURL,
            luckyDrawEnabled: values.luckyDrawEnabled,
            createdBy: values.createdBy,
          })
          .returning();
        if (!eventData) {
          tx.rollback();
          throw new Error("An error occrued while creating an event");
        }
        const seats = Array.from(
          { length: Number(values.totalSeats) },
          (_, i) => ({
            eventId: eventData[0]!.id,
            seatLabel: (i + 1).toString(),
            isLuckyDraw: false,
            isReserved: false,
          }),
        );
        const speakerData = await tx
          .insert(speaker)
          .values({ name: values.speaker, title: values.speakerTitle })
          .returning();
        await tx
          .insert(eventSpeakers)
          .values({ eventId: eventData[0]!.id, speakerId: speakerData[0]!.id });
        await tx.insert(seat).values(seats);
        await tx.insert(eventActivityLog).values({
          eventId: eventData[0]!.id,
          userId: values.createdBy,
          activityType: "create_event",
        });
        return eventData[0];
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
    return eventTransactiondata;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while creating an event",
    );
    throw new Error("An error occrued while creating an event");
  }
};

export const updateEvent = async function (values: UpdateEventValues) {
  try {
    const eventData = await db.transaction(async (tx) => {
      try {
        const eventData = await tx
          .update(event)
          .set({
            title: values.title,
            description: values.description,
            location: values.location,
            eventDate: new Date(values.eventDate),
            registrationStartDate: new Date(values.registrationStartDate),
            registrationEndDate: new Date(values.registrationEndDate),
            bannerURL: values.bannerURL,
            luckyDrawEnabled: values.luckyDrawEnabled,
          })
          .where(eq(event.id, values.id))
          .returning();
        await tx
          .update(speaker)
          .set({
            name: values.speaker,
            title: values.speakerTitle,
          })
          .where(eq(speaker.id, values.speakerId));
        if (!eventData) {
          tx.rollback();
          throw new Error("An error occrued while updating an event");
        }
        await tx.insert(eventActivityLog).values({
          eventId: values.id,
          userId: values.updatedBy,
          activityType: "update_event",
        });
        return eventData[0];
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
    return eventData;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while updating an event",
    );
    throw new Error("An error occrued while updating an event");
  }
};
