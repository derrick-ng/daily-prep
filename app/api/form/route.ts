//validate the user inputs by calling get requests
//send back in case user wants to sample data

import { getTraffic, getWeather } from "@/lib/apiHelper";
import prisma from "@/lib/prismaClient";
import z from "zod";
import { getFormData } from "@/lib/apiHelper";

const messages = {
  success: "Form Saved",
  failure: "Invalid Input",
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userIdParam = url.searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam) : undefined;

  if (userId === undefined) {
    return Response.json({ error: "invalid userId" }, { status: 400 });
  }
  const { cityName, origin, destination, mode, refreshToken } = await getFormData(userId);

  return Response.json({ cityName, origin, destination, mode, refreshToken }, { status: 200 });
}

export async function POST(request: Request) {
  const { userId, cityName, origin, destination, mode } = await request.json();

  if (!cityName && !origin && !destination) {
    return Response.json(
      {
        success: false,
        message: "Enter at least one input to save",
      },
      { status: 400 }
    );
  }

  try {
    const weatherData = cityName ? await getWeather(cityName) : null;
    const trafficData = origin && destination && mode ? await getTraffic(origin, destination, mode) : null;
    // const [weatherData, trafficData] = await Promise.all([getWeather(cityName), getTraffic(origin, destination, mode)]);

    if (weatherData || trafficData) {
      await prisma.formData.create({
        data: {
          userId: parseInt(userId as string),
          city: cityName,
          traffic_start: origin,
          traffic_end: destination,
          traffic_transportation: mode,
        },
      });
      return Response.json(
        {
          success: true,
          message: messages.success,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Failed to Save",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

const editFormSchema = z.object({
  userId: z.string(),
  cityName: z.string(),
  origin: z.string(),
  destination: z.string(),
  mode: z.string(),
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = editFormSchema.parse(body);

    const { userId, cityName, origin, destination, mode } = parsedBody;

    const weatherData = cityName ? await getWeather(cityName) : null;
    const trafficData = origin && destination && mode ? await getTraffic(origin, destination, mode) : null;

    await prisma.formData.update({
      where: {
        userId: Number(userId),
      },
      data: {
        city: cityName,
        traffic_start: origin,
        traffic_end: destination,
        traffic_transportation: mode,
      },
    });

    return Response.json(
      {
        success: true,
        message: messages.success,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to Save",
      },
      { status: 400 }
    );
  }
}
