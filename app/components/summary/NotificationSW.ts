"use client";

import { useEffect } from "react";
import { NotificationDataProp } from "@/app/types/Notification";

interface NotificationSWProps {
  onSuccess: (data: NotificationDataProp) => void;
}

//create a specialized service worker to access localStorage when notifications are clicked
export default function NotificationSW({ onSuccess }: NotificationSWProps) {
  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", (event) => {
      const data = event.data;

      console.log("pre setting data");
      onSuccess(data);
      console.log("post setting data", data);
    });
  }, []);

  return null;
}
