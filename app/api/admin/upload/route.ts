import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the File to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;

    // Cloudinary direct API endpoint
    const timestamp = Math.floor(Date.now() / 1000);
    const crypto = await import("crypto");
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const form = new FormData();
    form.append("file", new Blob([buffer]));
    form.append("api_key", apiKey);
    form.append("timestamp", timestamp.toString());
    form.append("upload_preset", uploadPreset);
    form.append("signature", signature);

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: form,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      console.error("Cloudinary Error:", data);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
