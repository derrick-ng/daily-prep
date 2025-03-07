import { getWeather } from "@/lib/apiHelper";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cityName: string | null = url.searchParams.get("cityName");
  try {
    const weatherData = await getWeather(cityName);
    return Response.json({ weatherData }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }

  // const apiKey: string | undefined = process.env.OPENWEATHERMAP_KEY;
  // const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  // try {
  //   const response = await axios.get(APIUrl);
  //   //should i have a type for weather?
  //   const weather = response.data;
  //   const temp = Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32);
  //   const tempMin = Math.round(((weather.main.temp_min - 273.15) * 9) / 5 + 32);
  //   const tempMax = Math.round(((weather.main.temp_max - 273.15) * 9) / 5 + 32);
  //   return Response.json({ temp, tempMin, tempMax });
  // } catch (error) {
  //   return Response.json({ error }, { status: 500 });
  // }
}
