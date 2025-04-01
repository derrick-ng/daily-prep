import { sendPushNotificationToUser } from "@/lib/pushService";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userIdParam = url.searchParams.get("userId");
  const endpoint = url.searchParams.get("endpoint");
  if (!endpoint) {
    throw new Error("Endpoint is required");
  }
  const userId = parseInt(userIdParam as string);

  const sendPushNotification = await sendPushNotificationToUser({userId, endpoint});

  return Response.json({ sendPushNotification }, { status: 200 });
}
