//had to get credentials from creating a service account
import { writeFileSync } from "fs";
//import { db } from "@/server/db/db";
//import * as Schema from "@/server/db/tables";
import { google } from "googleapis";

const embedRules = "embed?start=false&loop=false&delayms=3000";
const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});
//TODO: figure out how to process NextPageToken
//first get all folder IDs
const folderMap = new Map();
const drive = google.drive({ version: "v3", auth });

(async () => {
  const driveResponse = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "*",
  });
  if (driveResponse.data.files) {
    driveResponse.data.files.forEach((folder) => {
      folderMap.set(folder.id, folder.name);
    });
    console.log(folderMap);
  } else {
    //if no response, write log into file and abort operation
    const event = new Date().toUTCString();
    writeFileSync("errors.log", `Folder retrieval failed at ${event}`, {
      flag: "w",
    });
    return;
  }
})().then();
{
  //retrieve all files
  const allFiles = await drive.files.list({
    q: "mimeType!='application/vnd.google-apps.folder' and trashed=false",
    fields: "*",
  });
  if (allFiles.data.files) {
    allFiles.data.files.forEach((file) => {
      if (String(file.mimeType) != "application/vnd.google-apps.folder") {
        //add all nonfolder files to database
        //console.log("nonpresentation file: ", file.name, " ", file.id, " ", file.thumbnailLink, "/n", file.webViewLink, " ", file.modifiedTime, " ");
      }
      //build embed URL
      if (file.webViewLink) {
        const editIndex = file.webViewLink.indexOf("/edit");
        const embed_url = file.webViewLink.substring(0, editIndex + 1) + embedRules;
        console.log(embed_url);
      } else {
        const event = new Date().toUTCString();
        writeFileSync("errors.log", `File link not present at ${event}`);
      }
      //download thumbnail
      try {
        const resp = fetch(String(file.thumbnailLink), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(resp);
      } catch {
        return;
      }
    });
  } else {
    const event = new Date().toUTCString();
    writeFileSync("errors.log", `File retrieval failed at ${event}`);
  }
}

/*
//loops through each folder to get presentation files
  driveResponse.data.files.forEach((folder) => {
    console.log(folder.name, " ", folder.id)
    (async () => {
      const slides = await drive.files.list({
        q: `"\'${folder.id}\' in parents`,
        fields: "nextPageToken, files(id, name)"
      })
    })
    console.log(slides.data.files)
  })
*/
