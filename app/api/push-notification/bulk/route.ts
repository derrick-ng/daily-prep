import prisma from "@/lib/prismaClient";
import { sendPushNotificationToUser } from "@/lib/pushService";

export async function GET() {
  try {
    const allUsers = await prisma.pushSubscription.findMany({
      where: {
        enabled: true,
      },
    });

    await Promise.all(
      allUsers.map(({ userId, endpoint }) => {
        sendPushNotificationToUser({ userId, endpoint });
      })
    );

    return Response.json({ successfullySentPushNotifications: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
