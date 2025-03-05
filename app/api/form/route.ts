//validate the user inputs by calling get requests
//send back in case user wants to sample data

import { getTraffic, getWeather } from "@/lib/apiHelper";
import prisma from "@/lib/prismaClient";
import axios from "axios";

export async function GET(request: Request) {}

//create FormData entry
export async function POST(request: Request) {
  const { userId, cityName, origin, destination, mode } = await request.json();

  if (!cityName || !origin || !destination || !mode) {
    console.log(`city: ${cityName}\norigin:${origin}\ndestination:${destination}\nmode:${mode}`);
    return Response.json({ error: "Enter at least one input to save" }, { status: 400 });
  }

  //create a /lib/apiHelper.ts
    //will have the main code logic of weather/traffic
  //route.ts files will call this function
  try {
    const [weatherData, trafficData] = await Promise.all([getWeather(cityName), getTraffic(origin, destination, mode)]);

    if (weatherData && trafficData) {
      const FormDataEntry = await prisma.formData.create({
        data: {
          userId: parseInt(userId as string),
          city: cityName,
          traffic_start: origin,
          traffic_end: destination,
          traffic_transportation: mode,
        },
      });
      return Response.json({ FormDataEntry }, { status: 201 });
    }
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
