import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { auth } from "@clerk/nextjs"; // or your auth setup (optional)

const f = createUploadthing();

export const ourFileRouter = {
  trekImageUploader: f({ image: { maxFileSize: "4MB" } })
    // Optional authentication check
    .middleware(async () => {
      // Example: You can check if the user is an admin
      // const user = auth();
      // if (!user) throw new Error("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file.url);
      // You can optionally store file.url in your Supabase database here.
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
