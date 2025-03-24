import axios from "axios";
import { WeatherData } from "@/app/types/Weather";
import { TrafficData } from "@/app/types/Traffic";
import prisma from "./prismaClient";

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
