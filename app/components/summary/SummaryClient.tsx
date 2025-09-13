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
      <div className="text-center text-lg font-semibold my-8">
        Daily Prep Summary: {year}/{month}/{day}
        <NotificationSW onSuccess={setNotificationData} />
      </div>

      {storedNotificationData && (
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 px-6">
            <div className="font-semibold">Traffic and Weather</div>
            <div>
              <div>
                {storedNotificationData.traffic.distance} miles to travel {storedNotificationData.traffic.duration} minutes
              </div>
              <div>{storedNotificationData.weather.temp}° now</div>
              <div>
                {storedNotificationData.weather.tempMin} - {storedNotificationData.weather.tempMax}°
              </div>
            </div>

            <br />
            <div className="font-semibold">Tasks for today:</div>
            {storedNotificationData.tasks.taskList.map((task) => (
              <div key={task}>{task} </div>
            ))}
          </div>

          <div className="space-y-4 px-6">
            <div className="font-semibold">Unread Emails in the last 10 hours:</div>
            <MessageList messages={storedNotificationData.emails} openMessage={openMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
