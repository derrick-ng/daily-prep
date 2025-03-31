import { getPushNotificationDetails } from "@/lib/apiHelper";
import prisma from "@/lib/prismaClient";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const response = await getPushNotificationDetails(parseInt(userId as string));

    return Response.json({ response }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, endpoint, p256dh, auth } = body;

    console.log(body);
    const response = await prisma.pushSubscription.create({
      data: {
        userId: parseInt(userId as string),
        endpoint,
        p256dh,
        auth,
      },
    });

    return Response.json({ response }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
