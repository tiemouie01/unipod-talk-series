import { z } from "zod";

export const reservationFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  occupation: z.string().min(2, "Occupation is required"),
  seatId: z.string().uuid("Seat selection is required"),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
