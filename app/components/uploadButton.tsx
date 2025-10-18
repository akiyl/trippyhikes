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
        if (res && res[0]?.ufsUrl) {
          console.log("✅ Uploaded:", res[0].ufsUrl);
          onUploadComplete?.(res[0].ufsUrl);
        }
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
      appearance={{
        button:
          "bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition",
      }}
    />
  );
}
