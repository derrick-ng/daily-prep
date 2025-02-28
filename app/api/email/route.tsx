export async function GET() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const apiKey = process.env.GMAIL_KEY;
  const clientSecret = process.env.CLIENT_SECRET;
  return Response.json({ clientId, apiKey, clientSecret });
}
