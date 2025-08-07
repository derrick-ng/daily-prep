"use client";

import NotificationSW from "./NotificationSW";
import { useEffect, useState } from "react";
import { NotificationDataProp } from "@/app/types/Notification";
import { loadNotificationDataFromStorage, saveNotificationDataToStorage } from "@/lib/notificationStorage";

interface SummaryClientProps {
  date: string[];
}

export default function SummaryClient({ date }: SummaryClientProps) {
  const [notificationData, setNotificationData] = useState<NotificationDataProp | null>(null);
  const [storedNotificationData, setStoredNotificationData] = useState<NotificationDataProp>();
  const [year, month, day] = date;

  // still need to figure out diff implementations for sample button noti and "normal/scheduled" noti
  useEffect(() => {
    if (!notificationData) {
      return;
    }
    saveNotificationDataToStorage({ date, notificationData });
  }, [notificationData]);

  useEffect(() => {
    const storedData = loadNotificationDataFromStorage({ date });

    if (!storedData) {
      console.log("could not find notification data in localStorage");
    }

    setStoredNotificationData(storedData);
  }, []);

  return (
    <div>
      <div>
        Daily Prep: {year}/{month}/{day}
        <NotificationSW onSuccess={setNotificationData} />
      </div>

      {storedNotificationData && (
        <div>
          <div>data grabbed from notification post message</div>
          <div>
            {storedNotificationData.traffic.distance} miles in {storedNotificationData.traffic.duration} minutes
          </div>
          <div>{storedNotificationData.weather.temp}° now</div>
          <div>
            {storedNotificationData.weather.tempMin} - {storedNotificationData.weather.tempMax}°
          </div>
          {storedNotificationData.tasks.taskList.map((task) => (
            <div key={task}>{task} </div>
          ))}
        </div>
      )}
    </div>
  );
}
