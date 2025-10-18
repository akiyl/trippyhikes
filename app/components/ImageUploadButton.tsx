"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUploadButton({
  onUploadComplete,
}: {
  onUploadComplete?: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "trekImageUploader">
      endpoint="trekImageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]?.url) {
          onUploadComplete?.(res[0].url);
        }
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
      appearance={{
        button:
          "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition",
      }}
      content={{
        button: "Upload Trek Image",
      }}
    />
  );
}
