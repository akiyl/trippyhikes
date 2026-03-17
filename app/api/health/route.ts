import { prisma } from "@/lib/prisma.js";

export async function GET() {
  try {
    // Lightweight check — do not expose secrets in response
    await prisma.$queryRaw`SELECT 1`;
    return new Response(JSON.stringify({ ok: true, db: true }), {
      status: 200,
    });
  } catch (e: any) {
    // Return the error message to make debugging easier (this will appear in logs)
    const message = e?.message || String(e);
    return new Response(
      JSON.stringify({ ok: false, db: false, error: message }),
      {
        status: 500,
      },
    );
  }
}
