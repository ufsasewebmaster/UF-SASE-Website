//had to get credentials from creating a service account
import fs, { writeFile, writeFileSync } from "fs";
import path from "path";
import { db } from "@/server/db/db";
import * as Schema from "@/server/db/tables";
import { SERVER_ENV } from "@server/env";
import { eq } from "drizzle-orm";
import { google } from "googleapis";

const embedRules = "embed?start=false&loop=false&delayms=3000";
const auth = new google.auth.GoogleAuth({
  credentials: SERVER_ENV.GOOGLE_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const logFilePath = "errors.log";

//TODO: figure out how to process NextPageToken
/*Note: by enforcing slide deck naming guidelines for GBMs, can sort w/o relying on timestamps
said guidelines: all names MUST start with GBM followed by number and underscore
after that, all hyphens and underscores are replaced by spaces, while spaces and capitalization are left alone
*/

// Not necessary but helps clarify what structure we're using
interface DriveFolder {
  id: string;
  name: string;
}

interface DriveFile {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
  modifiedTime?: string;
  parents: Array<string>;
}
interface FileDriveResponse {
  nextPageToken?: string;
  files?: Array<DriveFile>;
}
interface FolderDriveResponse {
  files?: Array<DriveFolder>;
}

const writeError = (err: string) => {
  console.log(err);
  writeFileSync(logFilePath, err + "\n", { flag: "a" });
};

const folderMap = new Map<string, string>();
const drive = google.drive({ version: "v3", auth });

async function insertSlides(category: string, name: string, semester: string, thumbnailUrl: string, embedUrl: string, date: Date) {
  try {
    await db.insert(Schema.meetingSlides).values({
      category,
      name,
      semester,
      thumbnailUrl,
      embedUrl,
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
    const category = parts[0].trim();
    const name = parts[1].trim();
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
function parseSemesterFolder(folderId: string): string | undefined {
  const folderName = folderMap.get(folderId) ?? "";
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
  const folderData = folderResp.data as FolderDriveResponse;

  if (!folderData.files || folderData.files.length === 0) {
    console.log("No files???");
    return;
  }
  folderData.files.forEach((folder) => {
    folderMap.set(folder.id, folder.name);
  });

  // Retrieve all files.
  // Remember that all the folders must be shared with the service account! Sometimes the folder-side permissions don't propogate correctly
  let files: Array<DriveFile> = [];
  let pageToken: string | undefined;
  do {
    const fileResponse = await drive.files.list({
      q: "mimeType!='application/vnd.google-apps.folder' and trashed=false",
      fields: "nextPageToken, files(id, name, thumbnailLink, webViewLink, modifiedTime, parents)",
      pageSize: 100,
      pageToken,
    });
    const fileData = fileResponse.data as FileDriveResponse;
    files = files.concat(fileData.files || []);
    pageToken = fileData.nextPageToken ?? undefined;
  } while (pageToken);

  // console.log(files);
  if (!files || files.length === 0) {
    writeError(`File retrieval failed at ${new Date().toUTCString()}`);
    return;
  }
  let processedFiles = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.name) {
      writeError(`Missing filename`);
      continue;
    }
    // In order to have a thumbnail link you need to manually hover over the google slides icon in the folder!
    // There is no way to activate this on the api
    if (!file.thumbnailLink) {
      writeError(`Missing thumbnail link for ${file.name}`);
      continue;
    }
    if (!file.webViewLink) {
      writeError(`Missing webViewLink for ${file.name}`);
      continue;
    }
    if (!file.parents) {
      writeError(`Missing parents for ${file.name}`);
      continue;
    }

    const processed = await processFileName(file.name);
    if (!processed) {
      console.log("Cannot process file name", file.name);
      return;
    }
    const { category, date, name } = processed;

    // Check if already processed
    const result = await db.select().from(Schema.meetingSlides).where(eq(Schema.meetingSlides.name, name)).limit(1);
    if (result.length !== 0) {
      console.log(`Slide "${name}" already exists, skipping...`);
      processedFiles++;
      continue;
    }

    // Create thumbnail file path
    const formattedTitle = `${category}_${name}_${date.toISOString().split("T")[0]}`;
    const filePath = `public/thumbnails/${formattedTitle.replaceAll(" ", "-")}_tn.png`;
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

    // Insert into database. Note we can left strip "public" from the filePath
    await insertSlides(category, name, semester, filePath.replace(/^public/, ""), embedURL, date);
    processedFiles++;
    console.log(`Processed file ${i + 1} of ${files.length}`);
  }
  console.log(`${processedFiles} out of ${files.length} slides generated successfully`);
  if (processedFiles < files.length) console.log(`log written to ${logFilePath}`);
})();
