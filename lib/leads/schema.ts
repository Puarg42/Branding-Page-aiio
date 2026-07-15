import { z } from "zod";

/** Shared validation for lead submissions (used by the server action). */
export const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(200).optional(),
  topic: z.string().trim().max(200).optional(),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept so we may contact you." }),
  }),
  source: z.string().trim().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
