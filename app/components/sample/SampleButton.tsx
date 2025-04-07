"use client";

import React from "react";
import axios from "axios";

const SampleButton = ({ userId }: { userId: number | null }) => {

  const handleSampleClick = async () => {
    if (!userId) {
      console.error("need to be logged in to see a sample of the data");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      const sendPushNotification = await axios.get("/api/push-notification/single", {
        params: {
          userId,
          endpoint: subscription?.endpoint,
        },
      });
      console.log("result of send push noti", sendPushNotification);
    } catch (error) {
      console.error("error finding form data", error);
    }
  };
  return (
    <div>
      <button onClick={handleSampleClick}>Sample</button>
    </div>
  );
};

export default SampleButton;
