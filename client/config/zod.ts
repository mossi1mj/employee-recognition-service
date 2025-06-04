import { z } from "zod";

import { RecognitionCategory } from "../openapi";

export const recognitionSchema = z
  .object({
    sender_id: z.number({
      required_error: "Wait, how did you get here without being logged in?",
    }),
    recipient_id: z
      .number({
        required_error: "We need a recipient for your recognition!",
      })
      .refine((id) => id > 0, {
        message:
          "Users must be in the popluated list, please select a valid recipient.",
      }),
    category: z.nativeEnum(RecognitionCategory, {
      errorMap: () => ({
        message:
          "Recognition without a category? That's chaotic good. Try again.",
      }),
    }),
    message: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 10, {
        message: "Short and sweet is fine, but at least 10 characters sweet.",
      }),
  })
  .refine((data) => data.sender_id !== data.recipient_id, {
    message: "Self recognitions are cool, but let's spread the love!",
    path: ["recipient_id"],
  });
