import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();
//compare request ID to password to prevent upload abuse
function auth(req: Request) {
  //request body must exactly match string
  const bodyStr: string = JSON.stringify(req.body);
  const reqObj = JSON.parse(bodyStr);
  if (reqObj && typeof reqObj === "object" && "key" in reqObj && reqObj.key == process.env.UPLOADTHING_KEY) {
    return "Admin";
  }
}
export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 100,
    },
  })
    .middleware(async ({ req }) => {
      const user: string | undefined = auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload successful for userId: ", metadata.userId);
      console.log("New File URL: ", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
