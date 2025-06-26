import  {z} from "zod"
export const createEventSchema = z.object({
  title: z.string().min(1, "Event name is required").max(100, "Event name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  eventDate: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  totalSeats: z
    .string()
    .min(1, "Total seats is required")
    .refine((val) => {
      const num = Number.parseInt(val)
      return !isNaN(num) && num > 0 && num <= 10000
    }, "Total seats must be a number between 1 and 10,000"),
  registrationStartDate: z.string().min(1, "Registration start date is required"),
  registrationEndDate: z.string().min(1, "Registration end date is required"),
  luckyDrawEnabled: z.boolean(),
  bannerURL: z.string()
})