import { sendPushNotificationToUser } from "@/lib/pushService";
import prisma from "@/lib/prismaClient";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userIdParam = url.searchParams.get("userId");
  const endpoint = url.searchParams.get("endpoint");
  if (!endpoint) {
    throw new Error("Endpoint is required");
  }
  const userId = parseInt(userIdParam as string);
  try {
    const users = await prisma.pushSubscription.findMany({
      where: { userId },
    });

    const results = await Promise.allSettled(users.map((user) => sendPushNotificationToUser({ userId, endpoint: user.endpoint })));
    return Response.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
  }

  // const sendPushNotification = await sendPushNotificationToUser({ userId, endpoint });
}
