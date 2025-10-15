import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  return new Response(JSON.stringify(session, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
