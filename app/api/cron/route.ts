import { sendPushNotificationToUser } from "@/lib/pushService";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userIdParam = url.searchParams.get("userId");
  const userId = parseInt(userIdParam as string);

  const sendPushNotification = sendPushNotificationToUser(userId);

  return Response.json({ sendPushNotification }, { status: 200 });
}
