"use client";

import axios from "axios";
import { useEffect } from "react";
import { bufferToBase64, urlBase64ToUint8Array } from "@/lib/notification";
interface ServiceWorkerRegisterProp {
  userId: string | null;
}

//
const ServiceWorkerRegister = ({ userId }: ServiceWorkerRegisterProp) => {
  const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";

  useEffect(() => {
    async function requestNotification() {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.error("Notification permission not granted");
          return;
        }
      }
    }
    requestNotification();
  }, []);

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
    }
    registerPushSubscription();

    navigator.serviceWorker.oncontrollerchange = () => {
      console.log("new service worker activated");
    };
  }, [userId]);

  return null;
};

export default ServiceWorkerRegister;
