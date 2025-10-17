"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

export default function ImageUploadButton({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "trekImageUploader">
      endpoint="trekImageUploader"
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.url;
        if (url) onUploadComplete(url);
      }}
      onUploadError={(error) => {
        alert(`❌ Upload failed: ${error.message}`);
      }}
    />
  );
}
