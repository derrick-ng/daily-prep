import prisma from "@/lib/prismaClient";
import { refreshAccessToken } from "@/lib/refreshAccessToken";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const userData = await prisma.formData.findUnique({
      where: {
        userId: userId ? parseInt(userId) : undefined,
      },
    });
    if (!userData || !userData.email_refresh_token) {
      //this should prob be a 400.
      // need to redo all error messages
      return new Response(JSON.stringify({ error: "no refresh token found, use google login" }), { status: 200 });
    }
    const newAccessToken = await refreshAccessToken(userData.email_refresh_token);

    return Response.json({ newAccessToken }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
