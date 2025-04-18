// import webPush from "web-push";
import webpush from "web-push";
import { getFormData, getPushSubscriptions, getTodos, getTraffic, getWeather } from "./apiHelper";

interface sendPushNotificationToUserProp {
  userId: number;
  endpoint: string;
}

export async function sendPushNotificationToUser({ userId, endpoint }: sendPushNotificationToUserProp) {
  try {
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error("vapid keys are not defined in the environment variables");
    }
    // webPush.setVapidDetails("mailto:dailyprep.app@gmail.com", vapidPublicKey, vapidPrivateKey);
    webpush.setVapidDetails("mailto:dailyprep.app@gmail.com", vapidPublicKey, vapidPrivateKey);

    const formResponse = await getFormData(userId);
    const { cityName, origin, destination, mode } = formResponse;

    const weather = await getWeather(cityName);
    const traffic = await getTraffic(origin, destination, mode);
    const tasks = await getTodos(userId);
    const pushSubscriptionDetails = await getPushSubscriptions(endpoint);

    if (!pushSubscriptionDetails) {
      throw new Error("Push notification details are missing");
    }

    const tasksDisplay = tasks?.map((task) => `${task.task}`).join("\n");

    const dbEndpoint = pushSubscriptionDetails.endpoint;
    const { p256dh, auth } = pushSubscriptionDetails;

    const pushSubscription = {
      endpoint: dbEndpoint,
      keys: {
        p256dh,
        auth,
      },
    };

    const payload = JSON.stringify({
      title: "Daily Prep Message",
      body: `Weather: ${weather.temp}°F, ${weather.tempMin}-${weather.tempMax}°F\nTraffic: ${traffic.duration} mins to travel ${traffic.distance} miles\nTasks for the day:\n${tasksDisplay}
      `,
    });

    try {
      // await webPush.sendNotification(pushSubscription, payload);
      await webpush.sendNotification(pushSubscription, payload);
    } catch (error) {
      console.error("notification did not send", error);
    }
  } catch (error) {
    console.error("push service error", error);
  }
}
