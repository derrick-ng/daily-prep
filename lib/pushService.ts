import webPush from "web-push";
import { getFormData, getPushNotificationDetails, getTodos, getTraffic, getWeather } from "./apiHelper";

export async function sendPushNotificationToUser(userId: number) {
  try {
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error("vapid keys are not defined in the environment variables");
    }
    webPush.setVapidDetails("mailto:dailyprep.app@gmail.com", vapidPublicKey, vapidPrivateKey);

    const formResponse = await getFormData(userId);
    const { cityName, origin, destination, mode } = formResponse;

    const weather = await getWeather(cityName);
    const traffic = await getTraffic(origin, destination, mode);
    const tasks = await getTodos(userId);
    const pushNotificationDetails = await getPushNotificationDetails(userId);

    if (!pushNotificationDetails) {
      throw new Error("Push notification details are missing");
    }

    const tasksDisplay = tasks?.map((task) => `${task.task}`).join("\n");

    const { endpoint, p256dh, auth } = pushNotificationDetails;

    const pushSubscription = {
      endpoint: endpoint,
      keys: {
        p256dh: p256dh,
        auth: auth,
      },
    };

    const payload = JSON.stringify({
      title: "Daily Prep Message",
      body: `Weather: ${weather.temp}°F, ${weather.tempMin}-${weather.tempMax}°F\nTraffic: ${traffic.duration} mins to travel ${traffic.distance} miles\nTasks for the day:\n${tasksDisplay}
      `,
    });

    webPush
      .sendNotification(pushSubscription, payload)
      .then(() => {
        console.log("Push sent succesffuly");
      })
      .catch((err) => console.error("push fail", err));
  } catch (error) {
    console.error("push service error", error);
  }
}
