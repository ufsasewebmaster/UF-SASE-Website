import { db } from "@/server/db/db";
import * as Schema from "@/server/db/tables";
import { createErrorResponse } from "@shared/utils";
import { and, eq, gte, like, lte } from "drizzle-orm";
import { Hono } from "hono";

const eventRoutes = new Hono();

// Fetch events between a start and end date
eventRoutes.get("/events", async (c) => {
  try {
    const startDateStr = c.req.query("start_date");
    const endDateStr = c.req.query("end_date");

    if (!startDateStr || !endDateStr) {
      const result = await db.select().from(Schema.events);
      return c.json(result);
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return createErrorResponse(c, "DATE_FORMAT_INVALID", "Invalid date format", 400);
    }

    const eventsData = await db
      .select()
      .from(Schema.events)
      .where(and(lte(Schema.events.start_time, endDate), gte(Schema.events.end_time, startDate)));
    return c.json(eventsData);
  } catch (error) {
    if (error) return createErrorResponse(c, "MISSING_EVENT", error.toString(), 500);
  }
});

// Add event
eventRoutes.post("/events", async (c) => {
  try {
    const body = await c.req.json();

    const requiredFields = ["name", "location", "start_time", "end_time"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return createErrorResponse(c, "MISSING_REQUIRED_FIELD", `Field '${field}' is required`, 400);
      }
    }

    const startTime = new Date(body.start_time);
    const endTime = new Date(body.end_time);
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return createErrorResponse(c, "TIME_FORMAT_INVALID", "Invalid start_time or end_time format", 400);
    }

    const result = await db
      .insert(Schema.events)
      .values({
        ...body,
        start_time: startTime,
        end_time: endTime,
      })
      .returning();

    return c.json({
      message: `Inserted event with ID: ${result[0].id}`,
      data: result[0],
    });
  } catch (error) {
    if (error) return createErrorResponse(c, "ADD_BLOG_ERROR", error.toString(), 500);
  }
});

// Update event
eventRoutes.patch("/events", async (c) => {
  try {
    const body = await c.req.json();
    const { id, ...update } = body;
    if (!id) {
      return createErrorResponse(c, "MISSING_EVENT_ID", "Event ID required", 400);
    }
    const existingEvent = await db.select().from(Schema.events).where(eq(Schema.events.id, id)).get();
    if (!existingEvent) {
      return createErrorResponse(c, "EVENT_NOT_FOUND", `No event with ID ${id}`, 404);
    }
    const startTime = new Date(body.start_time);
    const endTime = new Date(body.end_time);
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return createErrorResponse(c, "TIME_FORMAT_INVALID", "Invalid start_time or end_time format", 400);
    }
    const updatedEvent = await db
      .update(Schema.events)
      .set({
        ...update,
        start_time: startTime,
        end_time: endTime,
        time_updated: new Date(),
      })
      .where(eq(Schema.events.id, id))
      .returning();
    return c.json({
      message: `Updated event with ID: ${updatedEvent[0].id}`,
      data: updatedEvent[0],
    });
  } catch (error) {
    if (error) return createErrorResponse(c, "UPDATE_EVENT_ERROR", error.toString(), 500);
  }
});

// Fetch event by ID
eventRoutes.get("/events/:eventID", async (c) => {
  try {
    const eventID = c.req.param("eventID");
    if (!eventID) {
      return createErrorResponse(c, "MISSING_EVENT_ID", "Event Id required", 400);
    }
    const result = await db.select().from(Schema.events).where(eq(Schema.events.id, eventID)).limit(1);
    if (result.length === 0) {
      return createErrorResponse(c, "EVENT_NOT_FOUND", "Event not found", 404);
    }
    return c.json(result[0]);
  } catch (error) {
    if (error) return createErrorResponse(c, "FETCH_EVENT_ERROR", error.toString(), 500);
  }
});

// Fetch event ID by name
eventRoutes.get("/events/search/:name", async (c) => {
  try {
    const searchName = c.req.param("name");
    const result = await db
      .select({ resEventIDs: Schema.events.id })
      .from(Schema.events)
      .where(like(Schema.events.name, `%${searchName}%`)); // Approximate search
    const eventIDs = result.map((row) => row.resEventIDs);
    return c.json(eventIDs);
  } catch (error) {
    if (error) return createErrorResponse(c, "SEARCH_EVENTS_ERROR", error.toString(), 500);
  }
});

export default eventRoutes;
