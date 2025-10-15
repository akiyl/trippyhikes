export async function GET() {
  // Safe debug info: avoid printing secrets.
  const nextauthSecretSet = !!process.env.NEXTAUTH_SECRET;
  const nextauthUrlSet = !!process.env.NEXTAUTH_URL;
  const nodeEnv = process.env.NODE_ENV || null;

  return new Response(
    JSON.stringify({ nextauthSecretSet, nextauthUrlSet, nodeEnv }, null, 2),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
