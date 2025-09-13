// import webPush from "web-push";
import webpush from "web-push";
import { getFormData, getPushSubscriptions, getTodos, getTraffic, getWeather, getEmailMessages } from "./apiHelper";

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
    const { cityName, origin, destination, mode, refreshToken } = formResponse;

    const weather = await getWeather(cityName);
    const traffic = await getTraffic(origin, destination, mode);
    const emails = await getEmailMessages(refreshToken)

    const tasks = await getTodos(userId);
    const taskList = tasks?.map((task) => task.task);

    const pushSubscriptionDetails = await getPushSubscriptions(endpoint);

    if (!pushSubscriptionDetails) {
      throw new Error("Push notification details are missing");
    }

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
      data: {
        weather: { temp: weather.temp, tempMin: weather.tempMin, tempMax: weather.tempMax, cityName },
        traffic: { duration: traffic.duration, distance: traffic.distance, origin, destination, mode },
        tasks: { taskList },
        emails: emails
      },
    });

    try {
      // await webPush.sendNotification(pushSubscription, payload);
      await webpush.sendNotification(pushSubscription, payload);
      return { success: true, message: "notification sent" };
    } catch (error) {
      console.error("notification did not send", error);
    }
  } catch (error) {
    console.error("push service error", error);
  }
}
