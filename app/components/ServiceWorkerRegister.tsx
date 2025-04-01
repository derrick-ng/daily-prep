"use client";

import axios from "axios";
import { useEffect } from "react";

interface ServiceWorkerRegisterProp {
  userId: string | null;
}

//
const ServiceWorkerRegister = ({ userId }: ServiceWorkerRegisterProp) => {
  const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";

  function bufferToBase64(buffer: ArrayBuffer | null) {
    if (!buffer) return null;
    const bytes = new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  }

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function registerPushSubscription() {
      try {
        if (!("serviceWorker" in navigator)) {
          console.error("service workers not supported in this browser");
        }

        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          const pushSubscriptionResult = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey,
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

        const dbEndpoint = dbSubscription.data.response.endpoint;

        if (subscription?.endpoint != dbEndpoint) {
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
        }

        return;
      } catch (error) {
        console.log("user blocked notifications", error);
      }
    }
    registerPushSubscription();

    navigator.serviceWorker.oncontrollerchange = () => {
      console.log("new service worker activated");
    };
  }, []);

  return null;
};

export default ServiceWorkerRegister;
