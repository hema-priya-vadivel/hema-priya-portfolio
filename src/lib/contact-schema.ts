import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Message is too long."),
  /** Honeypot checkbox: browsers never autofill it and people never see it. */
  hp_check: z.string().max(20).optional(),
  /** Milliseconds the visitor spent on the form (measured client-side). */
  elapsedMs: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
