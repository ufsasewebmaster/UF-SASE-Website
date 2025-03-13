import assert from "assert";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { SERVER_ENV } from "@/server/env";
import { google } from "googleapis";

// Ensure you run from the home dirctory if independnetly
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "src", "client", "assets", "slides_data.json");
const parentFolderId = "1OHYGiIuqYP2YsdLXsxG4XW-nQuUd00oR";

// console.log(SERVER_ENV);
// console.log(SERVER_ENV.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"));

async function generateSlides() {
  console.log(SERVER_ENV.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"));

  // Ensure that these are in env. Refer to env document
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: SERVER_ENV.GOOGLE_CLIENT_EMAIL,
      private_key: SERVER_ENV.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = google.drive({ version: "v3", auth });

  // Query for semestser folders within parent folder
  const folderRes = await drive.files.list({
    q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id, name)",
  });

  const slidesData: { [semester: string]: Array<{ name: string; webViewLink: string; thumbnailLink?: string }> } = {};

  if (folderRes.data.files) {
    for (const folder of folderRes.data.files) {
      const semester = folder.name || "Unnamed Semester";

      // ensure this doesn't happen
      assert(semester !== "Unnamed Semester");

      // List all slide files in this semester folder
      const slidesRes = await drive.files.list({
        q: `'${folder.id}' in parents and trashed=false`,
        fields: "files(id, name, webViewLink, thumbnailLink)",
      });
      // Ensure matches what we expect!
      slidesData[semester] =
        slidesRes.data.files?.map((file) => ({
          name: file.name || "Untitled Slide",
          webViewLink: file.webViewLink || "",
          thumbnailLink: file.thumbnailLink || "",
        })) || [];
    }
  }

  const output = JSON.stringify(slidesData, null, 2);
  await writeFile(filePath, output, "utf-8");
  console.log("Slides data generated successfully at", filePath);
}

generateSlides().catch(console.error);

// //const key = "AIzaSyAbQwIEo6qgXEx9NTNqAgFD94u2IXRozPI";
// //tutorial link: https://giminiani.com/posts/google-drive-api-with-node-js/#create-a-service-account
// import { google } from "googleapis";
// import { SERVER_ENV } from "@/server/env";

// // If modifying these scopes, delete token.json.
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.

// /**
//  * Lists the names and IDs of up to 10 files.
//  */
// /*
// const auth = new google.auth.GoogleAuth({
//   keyFile: './credentials.json',
//   scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
// });
// */

// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: SERVER_ENV.GOOGLE_CLIENT_EMAIL,
//     private_key: SERVER_ENV.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   },
//   scopes: ["https://www.googleapis.com/auth/drive"],
// });

// //TODO: figure out how to process NextPageToken
// //first get all folder IDs
// //embed?start=false&loop=false&delayms=3000
// const folderMap = new Map();
// const drive = google.drive({ version: "v3", auth });

// (async () => {
//   const driveResponse = await drive.files.list({
//     q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
//     fields: "*",
//   });
//   driveResponse.data.files?.forEach((folder) => {
//     folderMap.set(folder.id, folder.name);
//   });
//   console.log(folderMap);
// })()
//   .catch((e) => {
//     console.log(e);
//   })
//   .then();
// {
//   //retrieve all files
//   const allFiles = await drive.files.list({
//     q: "trashed=false",
//     fields: "*",
//   });
//   allFiles.data.files?.forEach((file) => {
//     if (String(file.mimeType) != "application/vnd.google-apps.folder") {
//       console.log("nonpresentation file: ", file.name, " ", file.id, " ", file.thumbnailLink, " ", file.webViewLink);
//     }
//   });
//   console.log(allFiles.data);
// }

// /*
// //loops through each folder to get presentation files
//   driveResponse.data.files.forEach((folder) => {
//     console.log(folder.name, " ", folder.id)
//     (async () => {
//       const slides = await drive.files.list({
//         q: `"\'${folder.id}\' in parents`,
//         fields: "nextPageToken, files(id, name)"
//       })
//     })
//     console.log(slides.data.files)
//   })
// */
