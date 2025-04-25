import { SERVER_ENV } from "@server/env";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import type { JWTInput } from "google-auth-library";
import { google } from "googleapis";
import { Hono } from "hono";
import { z } from "zod";

const sheetsRoutes = new Hono();

const sheetResponseSchema = z.object({
  data: z.array(z.array(z.string())),
});

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(JSON.stringify(SERVER_ENV.GOOGLE_CREDENTIALS)) as JWTInput,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });

const SHEET_IDS: Record<"board" | "marston", string> = {
  board: "10Wx6CTsjUDtoSTYmVplydyAfoCm55FGVUNhEQRpiYVY",
  marston: "1qKKHQE5nxGDsBOKozQl2QVFQYEdsOcF7J_p-B-faksc",
};

sheetsRoutes.get("/resources/sheet", async (c) => {
  const which = c.req.query("sheet");
  if (which !== "board" && which !== "marston") {
    return createErrorResponse(c, "INVALID_SHEET", "Invalid or missing sheet name", 400);
  }

  // compute range
  let range: string;
  if (which === "board") {
    // find most recent Monday
    const today = new Date();
    const day = today.getDay(); // 0=Sun,1=Mon,...6=Sat
    const daysSinceMonday = (day + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysSinceMonday);

    // format as M/D
    const tabName = `${monday.getMonth() + 1}/${monday.getDate()}`;

    // build A1 range
    range = `'${tabName}'!B7:G`;
  } else {
    // marston stays static
    range = "'Bookers'!A1:C9";
  }

  try {
    const spreadsheetId = SHEET_IDS[which];
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const raw = result.data.values ?? [];
    const parsed = sheetResponseSchema.safeParse({ data: raw });
    if (!parsed.success) {
      console.error("Sheet validation error:", parsed.error);
      return createErrorResponse(c, "VALIDATION_ERROR", "Unexpected sheet shape", 500);
    }
    return createSuccessResponse(c, parsed.data.data, "Fetched sheet successfully");
  } catch (err) {
    console.error("Sheets API error:", err);
    return createErrorResponse(c, "FETCH_ERROR", "Failed to fetch Google Sheet", 500);
  }
});

export default sheetsRoutes;
