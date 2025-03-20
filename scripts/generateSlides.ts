//had to get credentials from creating a service account
import fs, { writeFile, writeFileSync } from "fs";
import path from "path";
import { db } from "@/server/db/db";
import * as Schema from "@/server/db/tables";
import { eq } from "drizzle-orm";
import { google } from "googleapis";

const embedRules = "embed?start=false&loop=false&delayms=3000";
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIALS_PATH,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

//TODO: figure out how to process NextPageToken
/*Note: by enforcing slide deck naming guidelines for GBMs, can sort w/o relying on timestamps
said guidelines: all names MUST start with GBM followed by number and underscore
after that, all hyphens and underscores are replaced by spaces, while spaces and capitalization are left alone
*/

interface DriveFile {
  id: string;
  name: string;
}

interface DriveResponse {
  data: {
    files?: Array<DriveFile>;
  };
}

const writeError = (err: string) => {
  writeFileSync("errors.log", err + "\n", { flag: "a" });
};

const folderMap = new Map<string, string>();
const drive = google.drive({ version: "v3", auth });

async function insertSlides(category: string, name: string, semester: string, thumbnail_url: string, embed_url: string, date: Date) {
  try {
    await db.insert(Schema.meetingSlides).values({
      category,
      name,
      semester,
      thumbnail_url,
      embed_url,
      date,
    });
  } catch (err) {
    writeError(`File ${name} was not added to DB: ${err}`);
  }
}

/**
 * Expected format: category_name_date.ext
 * For example: "GBM-4_Return-of-SASEbender_2025-03-19.pptx"
 */
async function processFileName(fileName: string): Promise<{ category: string; name: string; date: Date } | undefined> {
  try {
    // Remove file extension.
    const extIndex = fileName.lastIndexOf(".");
    const baseName = extIndex !== -1 ? fileName.slice(0, extIndex) : fileName;

    // Split by underscore.
    const parts = baseName.split("_");
    if (parts.length !== 3) {
      throw new Error("Filename must have exactly 3 parts separated by underscores.");
    }

    // Replace hyphens with spaces and trim
    const category = parts[0].trim().replace(/-/g, " ");
    const name = parts[1].trim().replace(/-/g, " ");
    const dateStr = parts[2].trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) throw new Error("Invalid date format.");

    return { category, name, date };
  } catch (error) {
    writeError(`Malformed string in ${fileName}: ${error}`);
    return undefined;
  }
}

/**
 * Ensures that the directory for the given file path exists.
 * [Change: Extracts parent directory from filePath]
 */
function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Downloads the thumbnail from the given link and writes it to filePath.
 */
async function downloadThumbnail(thumbnailLink: string): Promise<Buffer | undefined> {
  try {
    const linkString = thumbnailLink.replace("=s220", "=s880");
    const resp = await fetch(linkString, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const blob = await resp.blob();
    const arrayBuf = await blob.arrayBuffer();
    // Convert ArrayBuffer to Buffer.
    if (typeof arrayBuf !== "string") {
      const buffer = Buffer.from(arrayBuf);
      return buffer;
    }
    return undefined;
  } catch (error) {
    writeError(`Failed to download thumbnail from link ${thumbnailLink}: ${error}`);
    return undefined;
  }
}

/**
 * Builds the embed URL using the provided webViewLink.
 */
function buildEmbedURL(webViewLink: string): string | undefined {
  if (!webViewLink) return undefined;
  const editIndex = webViewLink.indexOf("/edit");
  return editIndex !== -1 ? webViewLink.substring(0, editIndex + 1) + embedRules : webViewLink;
}

/**
 * Expected folder name: year-semester, ex. "2023-Fall"
 * Returns "Uncategorized" if no match is found.
 */
function parseSemesterFolder(folderName: string): string | undefined {
  const regex = /^(\d{4})-(Fall|Spring|Summer|Winter)$/i;
  const match = folderName.match(regex);
  if (!match) return undefined;
  const year = match[1].trim();
  const semester = match[2].trim();
  return `${year} ${semester}`;
}

(async () => {
  // Map folder ids to semester
  const folderResp = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(name, id)",
  });
  const driveResponse: DriveResponse = {
    data: {
      files:
        folderResp.data.files?.map((file) => ({
          id: file.id ?? "",
          name: file.name ?? "",
        })) || [],
    },
  };
  if (!driveResponse.data.files || driveResponse.data.files.length === 0) {
    writeError(`Folder retrieval failed at ${new Date().toUTCString()}`);
    return;
  }
  driveResponse.data.files.forEach((folder) => {
    folderMap.set(folder.id, folder.name);
  });

  // 2. Retrieve all files.
  const fileResp = await drive.files.list({
    q: "mimeType!='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(name, thumbnailLink, webViewLink, modifiedTime, parents)",
  });
  const files = fileResp.data.files;
  if (!files || files.length === 0) {
    writeError(`File retrieval failed at ${new Date().toUTCString()}`);
    return;
  }
  let processedFiles = 0;
  for (const file of files) {
    if (!file.name) {
      writeError(`Missing filename, skipping file.`);
      continue;
    }
    if (!file.thumbnailLink) {
      writeError(`Missing thumbnail link for ${file.name}, skipping file.`);
      continue;
    }
    if (!file.webViewLink) {
      writeError(`Missing webViewLink for ${file.name}, skipping file.`);
      continue;
    }
    if (!file.parents) {
      writeError(`Missing parents for ${file.name}, skipping file.`);
      continue;
    }

    const processed = await processFileName(file.name);
    if (!processed) return;
    const { category, date, name } = processed;

    // Check if already processed
    const result = await db.select().from(Schema.meetingSlides).where(eq(Schema.meetingSlides.name, name)).limit(1);
    if (result.length !== 0) continue;

    // Create thumbnail file path
    const formattedTitle = `${category}_${name}_${date.toISOString().split("T")[0]}`;
    const filePath = `src/client/assets/thumbnails/${formattedTitle.replaceAll(" ", "-")}_tn.png`;
    ensureDirectoryExists(filePath);

    // Download thumbnail and write to file
    const thumbnailBuffer = await downloadThumbnail(String(file.thumbnailLink));
    if (!thumbnailBuffer) continue;
    ensureDirectoryExists(filePath);
    await new Promise((resolve, reject) => {
      writeFile(filePath, thumbnailBuffer, { flag: "w" }, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    // Embed URL
    const embedURL = buildEmbedURL(file.webViewLink);
    if (!embedURL) {
      writeError("invalid embed??");
      continue;
    }

    // Get semester from parent folder
    const semester = parseSemesterFolder(file.parents[0]);
    if (!semester) {
      writeError("invalid semester format");
      continue;
    }

    // Insert into database
    await insertSlides(category, name, semester, filePath, embedURL, date);
    processedFiles++;
  }
  console.log(`${processedFiles} out of ${files.length} slides generated successfully`);
})();
