import { SERVER_ENV } from "@server/env";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import { google } from "googleapis";
import { Hono } from "hono";
import { z } from "zod";

const sheetsRoutes = new Hono();

const sheetResponseSchema = z.object({
  data: z.array(z.array(z.string())),
});

const auth = new google.auth.GoogleAuth({
  credentials: SERVER_ENV.GOOGLE_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });

const SHEET_CONFIG: Record<string, { id: string; range: string }> = {
  board: {
    id: "10Wx6CTsjUDtoSTYmVplydyAfoCm55FGVUNhEQRpiYVY",
    range: "'Template'!B7:G",
  },
  marston: {
    id: "1qKKHQE5nxGDsBOKozQl2QVFQYEdsOcF7J_p-B-faksc",
    range: "'Bookers'!A1:C9",
  },
};

sheetsRoutes.get("/resources/sheet", async (c) => {
  const sheet = c.req.query("sheet");
  if (!sheet || !(sheet in SHEET_CONFIG)) {
    return createErrorResponse(c, "INVALID_SHEET", "Invalid or missing sheet name", 400);
  }

  try {
    const { id, range } = SHEET_CONFIG[sheet];
    const result = await sheets.spreadsheets.values.get({ spreadsheetId: id, range });
    const raw = result.data.values ?? [];

    // server‐side validation
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
