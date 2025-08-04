"use client";

import NotificationSW from "./NotificationSW";
import { useEffect, useState } from "react";
import { NotificationDataProp } from "@/app/types/Notification";

interface SummaryClientProps {
  date: string[];
}

export default function SummaryClient({ date }: SummaryClientProps) {
  const [notificationData, setNotificationData] = useState<NotificationDataProp>();
  const [year, month, day] = date;

  // still need to figure out diff btwn sample button noti and "normal/scheduled" noti
    useEffect(() => {

    },[notificationData])

  return (
    <div>
      <div>
        Daily Prep: {year}/{month}/{day}
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
