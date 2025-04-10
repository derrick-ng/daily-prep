import React, { useEffect, useState } from "react";
import { bufferToBase64, urlBase64ToUint8Array } from "@/lib/notification";
import axios from "axios";

interface NotificationBellProp {
  userId: string | null;
}

//icon that allows users to opt in to notifications
const NotificationBell = ({ userId }: NotificationBellProp) => {
  const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>();
  const [existingSubscription, setExistingSubscription] = useState<boolean>(false);
  const [sub, setsub] = useState<PushSubscription | null>(null);

  //registers service workers, grabs checks if notification bell is on or off
  useEffect(() => {
    async function checkPushSubscription() {
      try {
        if (!("serviceWorker" in navigator)) {
          console.error("service workers not supported in this browser");
        }

        const serviceWorker = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        const subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
          console.error("no push subscription found in useEffect");
          setPushSubscription(null);
          return;
        }

        const dbSubscription = await axios.get("/api/push-subscription", {
          params: {
            endpoint: subscription.endpoint,
          },
        });

        //there if is a subscription not saved in db,
        //axios always returns an object unless it throws, so have to check the response value
        if (!dbSubscription.data.response) {
          setExistingSubscription(false);
        } else {
          setExistingSubscription(true);
          setNotificationEnabled(dbSubscription.data.response.enabled);
        }
        setPushSubscription(subscription);
      } catch (error) {
        console.error("error useEffect checking push subscription", error);
      }
    }
    checkPushSubscription();
  }, []);

  const handleAllowNotificationClick = async () => {
    try {
      if (!pushSubscription) {
        //this might break PWA tho....
        const serviceWorker = await navigator.serviceWorker.ready;
        const subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        const endpoint = subscription.endpoint;
        const p256dh = bufferToBase64(subscription.getKey("p256dh"));
        const auth = bufferToBase64(subscription.getKey("auth"));

        try {
          const data = {
            userId,
            endpoint,
            p256dh,
            auth,
            enabled: true,
          };
          const response = await axios.post("/api/push-subscription", data);
          console.log("new push subscription to db success:", response);
        } catch (error) {
          console.error("error sending push notification object to backend", error);
        }
        return;
      }

      const data = {
        userId,
        endpoint: pushSubscription.endpoint,
        p256dh: bufferToBase64(pushSubscription.getKey("p256dh")),
        auth: bufferToBase64(pushSubscription.getKey("auth")),
        enabled: true,
      };
      console.log("data:", data);

      if (!existingSubscription) {
        const response = await axios.post("/api/push-subscription", data);
        console.log("moved push subscription to db success:", response);
      } else {
        const response = await axios.put("/api/push-subscription", data);
        console.log("toggle push subscription enable to true", response);
      }

      setNotificationEnabled(true);
      return;
    } catch (error) {
      console.log("user blocked notifications", error);
    }
  };

  const handleDisableNotificationClick = async () => {
    if (!pushSubscription) {
      return;
    }
    const data = {
      userId,
      endpoint: pushSubscription.endpoint,
      p256dh: bufferToBase64(pushSubscription.getKey("p256dh")),
      auth: bufferToBase64(pushSubscription.getKey("auth")),
      enabled: false,
    };

    try {
      const response = await axios.put("/api/push-subscription", data);
      setNotificationEnabled(false);
      console.log("disabled notifications", response);
    } catch (error) {
      console.error("error disabling notifications", error);
    }
  };
  return (
    <div>
      <p>
        {sub
          ? `ENDPOINT: ${sub?.endpoint} AUTH: ${bufferToBase64(sub?.getKey("auth") || null)} P256DH: ${bufferToBase64(sub?.getKey("p256dh") || null)}`
          : "not subscribed"}
      </p>
      {notificationEnabled ? (
        <button onClick={handleDisableNotificationClick}>Disable Notification</button>
      ) : (
        <button onClick={handleAllowNotificationClick}>Allow Notifications</button>
      )}
    </div>
  );
};

export default NotificationBell;
