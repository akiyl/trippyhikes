import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "node:buffer"; // ✅ Required for Node runtime

export const runtime = "nodejs"; // ✅ use Node instead of Edge
export const config = {
  api: {
    bodyParser: false, // ✅ allow large uploads
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB limit
    if (arrayBuffer.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("trek-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicData } = supabase.storage
      .from("trek-images")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (err: any) {
    console.error("❌ Upload route error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
