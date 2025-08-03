"use client";

import NotificationSW from "./NotificationSW";
import { useState } from "react";

interface NotificationDataProp {
  tasks?: string[];
  weather: { temp: number; tempMin: number; tempMax: number };
  traffic: { duration: number; distance: number };
}

interface SummaryClientProps {
  date: string[];
}

export default function SummaryClient({ date }: SummaryClientProps) {
  const [notificationData, setNotificationData] = useState<NotificationDataProp>();
  const [year, month, day] = date;

  return (
    <div>
      <div>
        valid date: {year}/{month}/{day}
        <NotificationSW onSuccess={setNotificationData} />
      </div>

      {notificationData && (
        <div>
          <div>data grabbed from notification post message</div>
          <div>
            {notificationData.traffic.distance} miles in {notificationData.traffic.duration} minutes
          </div>
          <div>{notificationData.weather.temp}° now</div>
          <div>
            {notificationData.weather.tempMin} - {notificationData.weather.tempMax}°
          </div>
        </div>
      )}
    </div>
  );
}
