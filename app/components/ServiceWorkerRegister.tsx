"use client";

import { useEffect } from "react";
interface ServiceWorkerRegisterProp {
  userId: string | null;
}

//
const ServiceWorkerRegister = ({ userId }: ServiceWorkerRegisterProp) => {
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

        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        await navigator.serviceWorker.ready;
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
