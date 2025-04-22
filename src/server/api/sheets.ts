import { SERVER_ENV } from "@server/env";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import { google } from "googleapis";
import { Hono } from "hono";

const sheetsRoutes = new Hono();

const auth = new google.auth.GoogleAuth({
  credentials: SERVER_ENV.GOOGLE_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

const SHEET_CONFIG: { [key: string]: { id: string; range: string } } = {
  board: {
    id: "10Wx6CTsjUDtoSTYmVplydyAfoCm55FGVUNhEQRpiYVY",
    range: "Sheet1!A1:G30",
  },
  marston: {
    id: "1qKKHQE5nxGDsBOKozQl2QVFQYEdsOcF7J_p-B-faksc",
    range: "Sheet1!A1:D20",
  },
};

sheetsRoutes.get("/resources/sheet", async (c) => {
  const sheet = c.req.query("sheet");

  if (!sheet || !(sheet in SHEET_CONFIG)) {
    return createErrorResponse(c, "INVALID_SHEET", "Invalid or missing sheet name", 400);
  }

  try {
    const { id, range } = SHEET_CONFIG[sheet];
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range,
    });

    return createSuccessResponse(c, result.data.values ?? [], "Fetched sheet successfully");
  } catch (err) {
    console.error(err);
    return createErrorResponse(c, "FETCH_ERROR", "Failed to fetch Google Sheet", 500);
  }
});

export default sheetsRoutes;
