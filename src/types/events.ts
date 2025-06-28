import type { createEventSchema } from "@/validation/events";
import type z from "zod";
import type { getEvents } from "@/server/db/queries";

export type CreateEventFormData = z.infer<typeof createEventSchema>;
export type CreateEventValues = CreateEventFormData & { createdBy: string };
export type EventManagementValues = NonNullable<Awaited<ReturnType<typeof getEvents>>["eventsData"]>[number];
