import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  trekImageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      // Use `ufsUrl` instead of `url`
      return { url: file.ufsUrl };
      // you can rename to `ufsUrl` if you want to avoid confusion:
      // return { ufsUrl: file.ufsUrl };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
