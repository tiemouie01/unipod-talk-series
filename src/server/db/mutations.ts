import type { CreateEventValues } from "@/types/events";
import { db } from ".";
import { event } from "./schema";

export const createEvent = async function (values: CreateEventValues) {
  try {
    const eventData = await db
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
    return eventData[0];
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while creating an event",
    );
    throw new Error("An error occrued while creating an event");
  }
};
