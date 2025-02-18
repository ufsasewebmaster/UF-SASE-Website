import { db } from "@/server/db/db";
import * as Schema from "@/server/db/tables";
import { createErrorResponse } from "@shared/utils";
import { and, eq, gte, like, lte } from "drizzle-orm";
import { Hono } from "hono";

const eventRoutes = new Hono();

// Fetch all events
eventRoutes.get("/events/all", async (c) => {
  try {
    const result = await db.select().from(Schema.events);
    return c.json(result);
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "MISSING_EVENT", "Cannot fetch events", 400);
  }
});

// Fetch events between a start and end date
eventRoutes.get("/events", async (c) => {
  try {
    // Collect startDate and endDate
    const startDateStr = c.req.query("start_date");
    const endDateStr = c.req.query("end_date");
    if (!startDateStr || !endDateStr) {
      return createErrorResponse(c, "", "Start and end dates are required", 400);
    }

    // Parse startDare and endDate into Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Validate the Date format
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return createErrorResponse(c, "", "Invalid date format", 400);
    }

    const eventsData = await db
      .select()
      .from(Schema.events)
      .where(and(lte(Schema.events.start_time, endDate), gte(Schema.events.end_time, startDate)));
    return c.json(eventsData);
  } catch (error) {
    if (error) return createErrorResponse(c, "FETCH_EVENTS_ERROR", error.toString(), 500);
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

// Fetch event by name
eventRoutes.get("/events/search/:name", async (c) => {
  try {
    const searchName = c.req.param("name");
    console.log(searchName);
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

// Add event
eventRoutes.post("/events/add", async (c) => {
  try {
    const eventData = await c.req.json();
    const newEvent = await db
      .insert(Schema.events)
      .values({
        ...eventData,
      })
      .returning();
    return c.json(`Inserted event with ID: ${newEvent[0].id}`);
  } catch (error) {
    if (error) return createErrorResponse(c, "ADD_EVENT_ERROR", error.toString(), 500);
  }
});

// Update event
eventRoutes.post("/events/update", async (c) => {
  try {
    const body = await c.req.json();
    const { id, ...update } = body;
    if (!id) {
      return createErrorResponse(c, "MISSING_EVENT_ID", "Event ID required", 400);
    }
    const updatedEvent = await db
      .update(Schema.events)
      .set({
        ...update,
        timeUpdated: new Date(),
        lastUpdateDate: new Date(),
      })
      .where(eq(Schema.events.id, id))
      .returning();
    return c.json(`Updated event with ID: ${updatedEvent[0].id}`);
  } catch (error) {
    if (error) return createErrorResponse(c, "UPDATE_EVENT_ERROR", error.toString(), 500);
  }
});

export default eventRoutes;
