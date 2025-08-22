import { NotificationDataProp } from "@/app/types/Notification";
import { convertDateToString } from "./convertDateToString";

interface saveNotificationDataToStorageProp {
  date: string[];
  notificationData: NotificationDataProp;
}

export function saveNotificationDataToStorage({ date, notificationData }: saveNotificationDataToStorageProp) {
  const dateString = convertDateToString(date);

  const storedData = {
    weather: notificationData.weather,
    traffic: notificationData.traffic,
    tasks: notificationData.tasks,
    emails: notificationData.emails
  };
  localStorage.setItem(`${dateString}-notification`, JSON.stringify(storedData));
}

interface loadNotificationDataFromStorageProp {
  date: string[];
}

export function loadNotificationDataFromStorage({ date }: loadNotificationDataFromStorageProp) {
  const dateString = convertDateToString(date);

  const localStorageData = localStorage.getItem(`${dateString}-notification`);
  if (!localStorageData) {
    return;
  }

  const storedData = JSON.parse(localStorageData);

  return storedData;
}
