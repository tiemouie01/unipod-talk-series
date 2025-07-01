import type { createEventSchema, updateEventSchema } from "@/validation/events";
import type z from "zod";
import type { getEvents, getEventById } from "@/server/db/queries";

export type CreateEventFormData = z.infer<typeof createEventSchema>;
export type CreateEventValues = CreateEventFormData & { createdBy: string };
export type EventManagementValues = NonNullable<Awaited<ReturnType<typeof getEvents>>["eventsData"]>[number];
export type EventDetailValues = NonNullable<Awaited<ReturnType<typeof getEventById>>["eventData"]>;
export type UpdateEventValues = z.infer<typeof updateEventSchema> & {updatedBy: string};
export type UpdateEventFormData = z.infer<typeof updateEventSchema>;

