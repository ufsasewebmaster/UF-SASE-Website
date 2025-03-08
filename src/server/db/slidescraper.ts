//const key = "AIzaSyAbQwIEo6qgXEx9NTNqAgFD94u2IXRozPI";
//had to get credentials from creating a service account
//tutorial link: https://giminiani.com/posts/google-drive-api-with-node-js/#create-a-service-account
import { google } from "googleapis";

// If modifying these scopes, delete token.json.
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

/**
 * Lists the names and IDs of up to 10 files.
 */
/*
const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
});
*/

const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});
//TODO: figure out how to process NextPageToken
//first get all folder IDs
//embed?start=false&loop=false&delayms=3000
const folderMap = new Map();
const drive = google.drive({ version: "v3", auth });

(async () => {
  const driveResponse = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "*",
  });
  driveResponse.data.files?.forEach((folder) => {
    folderMap.set(folder.id, folder.name);
  });
  console.log(folderMap);
})()
  .catch((e) => {
    console.log(e);
  })
  .then();
{
  //retrieve all files
  const allFiles = await drive.files.list({
    q: "trashed=false",
    fields: "*",
  });
  allFiles.data.files?.forEach((file) => {
    if (String(file.mimeType) != "application/vnd.google-apps.folder") {
      console.log("nonpresentation file: ", file.name, " ", file.id, " ", file.thumbnailLink, " ", file.webViewLink);
    }
  });
  console.log(allFiles.data);
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
