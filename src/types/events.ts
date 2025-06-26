import type { createEventSchema } from "@/validation/events";
import type z from "zod";
export type CreateEventFormData = z.infer<typeof createEventSchema>;
export type CreateEventValues = CreateEventFormData & { createdBy: string };
