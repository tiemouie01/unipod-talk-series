"use server";

import { auth } from "@/lib/auth";
import type { CreateEventFormData, UpdateEventFormData } from "@/types/events";
import { createEvent, createUser, updateEvent } from "./db/mutations";
import { headers } from "next/headers";
import {
  reservationFormSchema,
  type ReservationFormValues,
} from "@/lib/form-schemas";
import { createReservation } from "./db/mutations";
import { getNextAvailableSeat, getUser } from "./db/queries";

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

export const createReservationAction = async function (
  values: ReservationFormValues,
) {
  try {
    // Clean and sanitize form data.
    const parsed = reservationFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        data: null,
        error: parsed.error.flatten().fieldErrors,
      };
    }

    // Create a new user if they don't exist
    let userId = null;
    const { data: existingUserData, error: existingUserError } = await getUser({
      email: values.email,
    });

    if (existingUserError) {
      return {
        data: null,
        error: "Failed to log participant information, please try again",
      };
    }

    if (existingUserData) {
      userId = existingUserData.id;
    } else {
      const { data: newUserData, error: newUserError } = await createUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        occupation: values.occupation,
      });
      if (newUserError) {
        return {
          data: null,
          error: "Failed to log participant information, please try again",
        };
      }
      userId = newUserData!.id;
    }

    // Get next available seat
    const { data: seatData, error: seatError } = await getNextAvailableSeat({
      eventId: values.eventId,
    });

    if (seatError) {
      return {
        data: null,
        error: "Failed to fetch next available seat, please try again",
      };
    }

    const reservationData = await createReservation({
      userId: userId,
      eventId: values.eventId,
      seatId: seatData!.id,
      isLuckyDraw: false,
    });

    if (reservationData.error) {
      return {
        data: null,
        error: reservationData.error,
      };
    }

    return { data: reservationData, error: null };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return { data: null, error: "Failed to create reservation" };
  }
};
