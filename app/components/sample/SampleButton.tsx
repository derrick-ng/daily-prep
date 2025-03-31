"use client";

import React, { useEffect, useState } from "react";
import { WeatherData } from "@/app/types/Weather";
import { TrafficData } from "@/app/types/Traffic";
import axios from "axios";
import { Todo } from "@/app/types/Todo";

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
