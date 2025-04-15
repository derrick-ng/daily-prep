import prisma from "@/lib/prismaClient";
import axios from "axios";

export async function GET() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const apiKey = process.env.GMAIL_KEY;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  return Response.json({ clientId, apiKey, clientSecret, redirect_uri });
}

export async function POST(request: Request) {
  const { code, userId } = await request.json();

  const messages = {
    success: "Gmail Login Success",
    failure: "Gmail Login Fail",
  };

  try {
    const params = new URLSearchParams({
      code,
      clientId: process.env.OAUTH_CLIENT_ID!,
      apiKey: process.env.GMAIL_KEY!,
      clientSecret: process.env.CLIENT_SECRET!,
      redirect_uri: process.env.REDIRECT_URI!,
      grant_type: "authorization_code",
    });
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    // const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;
    await prisma.formData.upsert({
      where: {
        userId,
      },
      update: {
        email_refresh_token: refreshToken,
      },
      create: {
        userId,
        email_refresh_token: refreshToken,
      },
    });

    // const message = "Gmail Login Successful";

    return Response.json(
      {
        success: true,
        message: messages.success,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: messages.failure,
        error: error
      },
      { status: 500 }
    );
  }
}
