import React, { useState } from "react";
import { bufferToBase64, urlBase64ToUint8Array } from "@/lib/notification";
import axios from "axios";

interface NotificationBellProp {
  userId: string | null;
}

const NotificationBell = ({ userId }: NotificationBellProp) => {
  const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";
  //   const [ready, setReady] = useState(false);
  const [getSubscription, setGetSubscription] = useState(false);
  const [sub, setsub] = useState<PushSubscription | null>(null);

  const handleNotificationClick = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        console.error("service workers not supported in this browser");
      }

      const serviceWorker = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      //   const serviceworkerready = await navigator.serviceWorker.ready;

      const subscription = await serviceWorker.pushManager.getSubscription();
      setGetSubscription(true);
      setsub(subscription);

      if (!subscription) {
        const pushSubscriptionResult = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        const endpoint = pushSubscriptionResult.endpoint;
        const p256dh = bufferToBase64(pushSubscriptionResult.getKey("p256dh"));
        const auth = bufferToBase64(pushSubscriptionResult.getKey("auth"));

        try {
          const data = {
            userId,
            endpoint,
            p256dh,
            auth,
          };
          const response = await axios.post("/api/push-subscription", data);
          console.log("push noti to db success:", response);
        } catch (error) {
          console.error("error sending push notification object to backend", error);
        }
        return;
      }

      // (edge case) client side already agreed to notifications by default, doesnt prompt "allow notifications popup"
      // check if client side endpoint is already in db
      const dbSubscription = await axios.get("/api/push-subscription", {
        params: {
          endpoint: subscription.endpoint,
        },
      });

      console.log("dbsub:", dbSubscription);
      const existingSubscription = dbSubscription.data.response;

      if (!existingSubscription) {
        try {
          const data = {
            userId,
            endpoint: subscription.endpoint,
            p256dh: bufferToBase64(subscription.getKey("p256dh")),
            auth: bufferToBase64(subscription.getKey("auth")),
          };
          const response = await axios.post("/api/push-subscription", data);
          console.log("response: ", response);
        } catch (error) {
          console.error("error in loop comparing endpoints", error);
        }
      } else if (existingSubscription.userId != parseInt(userId as string)) {
        try {
          const data = {
            userId,
            endpoint: subscription.endpoint,
            p256dh: bufferToBase64(subscription.getKey("p256dh")),
            auth: bufferToBase64(subscription.getKey("auth")),
          };
          const response = await axios.put("/api/push-subscription", data);
          console.log("update userid to match endpoint", response);
        } catch (error) {
          console.error("could not update userId to match endpoint", error);
        }
      }

      return;
    } catch (error) {
      console.log("user blocked notifications", error);
    }
  };

  return (
    <div>
      <p>
        {getSubscription
          ? `ENDPOINT: ${sub?.endpoint} AUTH: ${bufferToBase64(sub?.getKey("auth") || null)} P256DH: ${bufferToBase64(sub?.getKey("p256dh") || null)}`
          : "not subscribed"}
      </p>
      <button onClick={handleNotificationClick}>Notification</button>
    </div>
  );
};

export default NotificationBell;
