//had to get credentials from creating a service account
import { writeFile, writeFileSync } from "fs";
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

const folderMap = new Map<string, string>();
const drive = google.drive({ version: "v3", auth });

async function insertSlides(
  name: string,
  parent_folder: string,
  thumbnail_url: string,
  embed_url: string,
  last_modified: Date,
  relative_order?: number,
) {
  try {
    await db.insert(Schema.meetingSlides).values({
      name,
      parent_folder,
      thumbnail_url,
      embed_url,
      last_modified,
      relative_order,
    });
  } catch (err) {
    writeFileSync("errors.log", `File ${name} was not added to DB. Error: \n ${err}`);
  }
}

(async () => {
  const driveResponse = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "*",
  });
  if (driveResponse.data.files) {
    driveResponse.data.files.forEach((folder) => {
      folderMap.set(String(folder.id), String(folder.name));
    });
    console.log(folderMap);
  } else {
    //if no response, write log into file and abort operation
    const event = new Date().toUTCString();
    writeFileSync("errors.log", `Folder retrieval failed at ${event}`, { flag: "a" });
    return;
  }
})().then();
{
  //retrieve all presentations
  const allFiles = await drive.files.list({
    q: "mimeType!='application/vnd.google-apps.folder' and trashed=false",
    fields: "*",
  });
  if (allFiles.data.files) {
    allFiles.data.files.forEach(async (file) => {
      //skip files that are already in database by searching for them by name
      const result = await db
        .select()
        .from(Schema.meetingSlides)
        .where(eq(Schema.meetingSlides.name, String(file.name)))
        .limit(1);
      if (result.length == 0) {
        //add all nonfolder files to database
        //format name
        let formattedTitle: string = String(file.name);
        let meetingNumber: number = -1;
        try {
          const prefixIndex: number = String(file.name).indexOf("_");
          meetingNumber = parseInt(String(file.name).slice(3, prefixIndex - 1));
          const extIndex: number = String(file.name).lastIndexOf(".");
          if (extIndex !== -1 && (String(file.name).slice(extIndex) === ".pptx" || String(file.name).slice(extIndex) === ".pdf")) {
            formattedTitle = String(file.name).slice(prefixIndex + 1, extIndex - 1);
          }
          formattedTitle.replace("_", " ");
          formattedTitle.replace("-", " ");
          formattedTitle.replace(".", " ");
        } catch {
          writeFileSync("errors.log", `Malformed string: ${file.name}`, { flag: "a" });
          return;
        }
        //download thumbnail
        const pathTitle: string = formattedTitle.replace(" ", "_");
        const filePath = `src/client/assets/thumbnails/${pathTitle}_tn.png`;
        try {
          //change URL to get max image size
          let linkString: string = String(file.thumbnailLink);
          linkString = linkString.replace("=s220", "=s880");
          const resp = await fetch(linkString, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const blob: Blob = await resp.blob();
          const arrayBuf: ArrayBuffer = await blob.arrayBuffer();
          if (typeof arrayBuf !== "string") {
            const buffer: Buffer = Buffer.from(arrayBuf);
            writeFile(filePath, buffer, { flag: "w" }, (err) => {
              console.log(err);
            });
          }
          //console.log(resp);
        } catch {
          writeFileSync("errors.log", `Failed to download thumbnail from link ${file.thumbnailLink}`, { flag: "a" });
          return;
        }

        //build embed URL
        if (!file.webViewLink) {
          const event = new Date().toUTCString();
          writeFileSync("errors.log", `File link not present at ${event}`, { flag: "a" });
          return;
        }
        const editIndex = file.webViewLink.indexOf("/edit");
        const embedURL: string = file.webViewLink.substring(0, editIndex + 1) + embedRules;

        //find parent folder name
        const fileParentArray: Array<string> | null | undefined = file.parents;

        if (!fileParentArray || typeof fileParentArray == "undefined") {
          const event = new Date().toUTCString();
          writeFileSync("errors.log", `fileParentArray not present at ${event}`, { flag: "a" });
          return;
        }

        if (fileParentArray.length < 1) {
          const event = new Date().toUTCString();
          writeFileSync("errors.log", `fileParentArray is empty at ${event}`, { flag: "a" });
          return;
        }

        //slide decks without parent folder can be put in "Uncategorized section on website"
        const parentFolderName: string = folderMap.get(fileParentArray[0])?.slice(1) ?? "";
        //build timestamp
        const timestamp = new Date(String(file.modifiedTime));
        console.log("file: ", formattedTitle, " ", parentFolderName, " ", file.thumbnailLink, "\n", file.webViewLink, " ", file.modifiedTime, " ");
        //add record to database, skipping and logging failed insertions
        insertSlides(formattedTitle, parentFolderName, filePath, embedURL, timestamp, meetingNumber);
      }
    });
  } else {
    const event = new Date().toUTCString();
    writeFileSync("errors.log", `File retrieval failed at ${event}`, { flag: "a" });
  }
}
