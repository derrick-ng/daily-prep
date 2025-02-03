"use client";
import axios from "axios";
import { useState } from "react";

interface weatherData {
  temp: number,
  tempMin: number,
  tempMax: number
}

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`/api/weather`, {
        params: { city: cityName },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.log("error in weather", error);
    }
  };

  //bottom appears when weatherData is not null
  //aka submit is sent
  return (
    <div>
      <h2>Open Weather Map API Test</h2>
      <label htmlFor="cityName">City Name:</label>
      <input type="text" id="cityName" name="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)} />
      <button onClick={handleSubmit}>submit</button>

      {weatherData && (
        <div>
          <p>{weatherData?.temp}°F</p>
          <div>
            <p>Min-Max temp</p>
            <p>
              {weatherData.tempMin}°F-{weatherData.tempMax}°F
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
