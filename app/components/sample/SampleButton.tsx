"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WeatherData } from "@/app/types/Weather";
import { TrafficData } from "@/app/types/Traffic";
import axios from "axios";
import SampleDisplay from "./SampleDisplay";
import { Todo } from "@/app/types/Todo";

const SampleButton = ({ userId }: { userId: number | null }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sampleDisplayPressed, setSampleDisplayPressed] = useState(false);
  const [mounted, setMounted] = useState(false);

  //react portal
  //makes sure portal is only rendered when DOM is ready
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSampleClick = async () => {
    if (!userId) {
      console.error("need to be logged in to see a sample of the data");
      return;
    }

    try {
      const formResponse = await axios.get("/api/form", {
        params: {
          userId,
        },
      });
      const { cityName, origin, destination, mode } = formResponse.data;

      const todosResponse = await axios.get("/api/todos", {
        params: {
          userId,
        },
      });
      setTodos(todosResponse.data.todos);
      setSampleDisplayPressed(true);

      const weatherResponse = await axios.get("/api/weather", {
        params: {
          cityName,
        },
      });
      setWeatherData(weatherResponse.data.weatherData);

      const trafficResponse = await axios.get("/api/traffic", {
        params: {
          origin,
          destination,
          mode,
        },
      });
      setTrafficData(trafficResponse.data.trafficData);
    } catch (error) {
      console.error("error finding form data", error);
    }
  };
  return (
    <div>
      <button onClick={handleSampleClick}>Sample</button>
      {mounted &&
        sampleDisplayPressed &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <SampleDisplay weatherData={weatherData} trafficData={trafficData} todos={todos} />
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSampleDisplayPressed(false)}>
                close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SampleButton;
