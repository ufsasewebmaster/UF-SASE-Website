// shared/schemas/eventSchema.ts
import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().min(1, "Event ID is required."),
  name: z.string().min(1, "Event name is required."),
  description: z.string().optional(),
  timeAdded: z.number().int().min(0, "Time added must be a valid timestamp."),
  timeUpdated: z.number().int().min(0, "Time updated must be a valid timestamp."),
  location: z.string().min(1, "Location is required."),
  startTime: z.number().int().min(0, "Start time must be a valid timestamp."),
  endTime: z.number().int().min(0, "End time must be a valid timestamp."),
  involvedGroups: z.string().optional(),
  slidesUrl: z.string().url("Slides URL must be a valid URL.").optional(),
});

export type Event = z.infer<typeof eventSchema>;
