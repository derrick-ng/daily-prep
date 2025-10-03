import axios from "axios";
import { WeatherData } from "@/app/types/Weather";
import { TrafficData } from "@/app/types/Traffic";
import prisma from "./prismaClient";
import { google } from "googleapis";

export async function getWeather(cityName: string | null): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHERMAP_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const weather = response.data;

    const temp = Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32);
    const tempMin = Math.round(((weather.main.temp_min - 273.15) * 9) / 5 + 32);
    const tempMax = Math.round(((weather.main.temp_max - 273.15) * 9) / 5 + 32);
    return { temp, tempMin, tempMax };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("unknown error in getWeather");
    }
  }
}

export async function getTraffic(origin: string | null, destination: string | null, mode: string | null): Promise<TrafficData> {
  const apiKey = process.env.DISTANCEMATRIX_KEY;
  const apiUrl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${apiKey}`;

  try {
    const trafficData = await axios.get(apiUrl);
    const traffic = trafficData.data;

    const distanceResponse = traffic.rows[0].elements[0].distance.value;
    const distance = Math.round(distanceResponse / 1609.344);

    const durationResponse = traffic.rows[0].elements[0].duration.value;
    const duration = Math.round(durationResponse / 60);

    return { distance, duration };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("unknown error in getTraffic");
    }
  }
}

export async function getFormData(userId: number) {
  const userFormData = await prisma.formData.findUnique({
    where: {
      userId,
    },
  });
  if (!userFormData) {
    console.error("error retrieving form data from user");
  }
  const cityName = userFormData?.city ?? null;
  const origin = userFormData?.traffic_start ?? null;
  const destination = userFormData?.traffic_end ?? null;
  const mode = userFormData?.traffic_transportation ?? null;
  const refreshToken = userFormData?.email_refresh_token ?? null;

  return { cityName, origin, destination, mode, refreshToken };
}

export async function getTodos(userId: number) {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });

    return todos;
  } catch (error) {
    console.error("error getting todos in helper", error);
  }
}

export async function getPushSubscriptions(endpoint: string) {
  try {
    const pushNotificationDetails = await prisma.pushSubscription.findUnique({
      where: {
        endpoint,
      },
    });
    return pushNotificationDetails;
  } catch (error) {
    console.error("either found another user with same endpoint or no match", error);
  }
}

export async function getEmailMessages(refreshToken: string | null) {
  if (!refreshToken) {
    return [];
  }

  const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const OAuth2Client = new google.auth.OAuth2(OAUTH_CLIENT_ID, CLIENT_SECRET);
  OAuth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: OAuth2Client });

  const response = await gmail.users.messages.list({
    userId: "me",
    q: "category:primary is:unread newer_than:15d",
  });

  const messages = response.data.messages || [];

  const allMessages = await Promise.all(
    messages.map(async (msg) => {
      const message = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      });
      return message.data;
    })
  );

  const emails = allMessages.map((msg) => {
    const headers = msg.payload?.headers || [];

    const subject = headers.find((header) => header.name === "Subject")?.value || "No Subject Found";
    const from = headers.find((header) => header.name === "From")?.value || "No Sender Found";
    const date = headers.find((header) => header.name === "Date")?.value || "No Date Found";

    const senderMatch = from.match(/<(.+)>/);
    const sender = senderMatch ? senderMatch[1].trim() : from;

    return {
      id: msg.id,
      subject,
      sender,
      date,
    };
  });

  return emails;
}
