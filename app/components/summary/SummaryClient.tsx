"use client";

import NotificationSW from "./NotificationSW";
import { useEffect, useState } from "react";
import { NotificationDataProp } from "@/app/types/Notification";
import { loadNotificationDataFromStorage, saveNotificationDataToStorage } from "@/lib/notificationStorage";
import MessageList from "../message/MessageList";

interface SummaryClientProps {
  date: string[];
}

export default function SummaryClient({ date }: SummaryClientProps) {
  const [notificationData, setNotificationData] = useState<NotificationDataProp | null>(null);
  const [storedNotificationData, setStoredNotificationData] = useState<NotificationDataProp>();
  const [notificationDataSaved, setNotificationDataSaved] = useState<boolean>(false);
  const [year, month, day] = date;

  // still need to figure out diff implementations for sample button noti and "normal/scheduled" noti
  useEffect(() => {
    if (!notificationData) {
      return;
    }
    saveNotificationDataToStorage({ date, notificationData });
    setNotificationDataSaved(true);
  }, [notificationData]);

  useEffect(() => {
    const storedData = loadNotificationDataFromStorage({ date });

    if (!storedData) {
      console.log("could not find notification data in localStorage");
    }

    setStoredNotificationData(storedData);
  }, [notificationDataSaved]);

  const openMessage = (messageId: string) => {
    const url = `https://mail.google.com/mail/u/0/#all/${messageId}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div>
        Daily Prep Summary: {year}/{month}/{day}
        <NotificationSW onSuccess={setNotificationData} />
      </div>

      {storedNotificationData && (
        <div>
          <div>
            {storedNotificationData.traffic.distance} miles to travel {storedNotificationData.traffic.duration} minutes
          </div>
          <div>{storedNotificationData.weather.temp}° now</div>
          <div>
            {storedNotificationData.weather.tempMin} - {storedNotificationData.weather.tempMax}°
          </div>

          <br />
          <div>Unread Emails in the last 10 hours:</div>
          <MessageList messages={storedNotificationData.emails} openMessage={openMessage} />
          <br />
          <div>Tasks for today:</div>
          {storedNotificationData.tasks.taskList.map((task) => (
            <div key={task}>{task} </div>
          ))}
        </div>
      )}
    </div>
  );
}
