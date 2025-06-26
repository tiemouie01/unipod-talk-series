"use server";

import { auth } from "@/lib/auth";
import type { CreateEventFormData } from "@/types/events";
import { createEvent } from "./db/mutations";
import { headers } from "next/headers";

export const createEventAction = async function (values: CreateEventFormData) {
  try {
    const userData = await auth.api.getSession({ headers: await headers() });
    if (!userData) {
      return { data: null, error: "please ensure you are logged in" };
    }
    const userId = userData.session.id;
    const eventData = await createEvent({ ...values, createdBy: userId });
    return { data: eventData, error: null };
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while creating an event",
    );
    return { data: null, error: "failed to create event" };
  }
};
