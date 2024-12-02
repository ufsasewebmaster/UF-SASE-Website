// shared/schemas/eventSchema.ts
import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().min(1, "Event ID is required."),
  name: z.string().min(1, "Event name is required."),
  description: z.string().optional(),
  time_added: z.number().int().min(0, "Time added must be a valid timestamp."),
  time_updated: z
    .number()
    .int()
    .min(0, "Time updated must be a valid timestamp."),
  location: z.string().min(1, "Location is required."),
  start_time: z.number().int().min(0, "Start time must be a valid timestamp."),
  end_time: z.number().int().min(0, "End time must be a valid timestamp."),
  involved_groups: z.string().optional(),
});

export type Event = z.infer<typeof eventSchema>;
