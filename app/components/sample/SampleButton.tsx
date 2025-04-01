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
      const sendPushNotification = await axios.get("/api/cron", {
        params: {
          userId,
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
