"use server";

import { auth } from "@/lib/auth";
import type { CreateEventFormData, UpdateEventFormData } from "@/types/events";
import { createEvent, updateEvent } from "./db/mutations";
import { headers } from "next/headers";

export const createEventAction = async function (values: CreateEventFormData) {
  try {
    const userData = await auth.api.getSession({ headers: await headers() });
    if (!userData) {
      return { eventdata: null, error: "please ensure you are logged in" };
    }
    const userId = userData.session.userId;
    const eventData = await createEvent({ ...values, createdBy: userId });
    return { eventdata: eventData, error: null };
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while creating an event",
    );
    return { eventdata: null, error: "failed to create event" };
  }
};

export const updateEventAction = async function (values: UpdateEventFormData) {
  try {
    const userData = await auth.api.getSession({ headers: await headers() });
    if (!userData) {
      return { eventdata: null, error: "please ensure you are logged in" };
    }
    const userId = userData.session.userId;
    const eventData = await updateEvent({ ...values, updatedBy: userId });
    return { eventdata: eventData, error: null };
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while updating an event",
    );
    return { eventdata: null, error: "failed to update event" };
  }
};
