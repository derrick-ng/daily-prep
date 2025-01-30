import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cityName = url.searchParams.get("city");
  const APIKey = process.env.OPENWEATHERMAP_KEY;
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

  try {
    const response = await axios.get(APIUrl);
    const weather = response.data;
    const temp = Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32);
    const tempMin = Math.round(((weather.main.temp_min - 273.15) * 9) / 5 + 32);
    const tempMax = Math.round(((weather.main.temp_max - 273.15) * 9) / 5 + 32);
    return Response.json({ temp, tempMin, tempMax})
  } catch (error) {
    return new Response("Error fetching weather data", { status: 500 });
  }
}
