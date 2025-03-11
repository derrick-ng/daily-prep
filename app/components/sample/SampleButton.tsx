"use client";
import React, { useState } from "react";
import { weatherData } from "@/app/types/Weather";
import { trafficData } from "@/app/types/Traffic";
import axios from "axios";
import SampleDisplay from "./SampleDisplay";

interface Todo {
  id: number;
  task: string;
}

const SampleButton = ({ userId }: { userId: number | null }) => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [trafficData, setTrafficData] = useState<trafficData | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [displayOn, setDisplayOn] = useState(false)

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
      const { cityName, origin, destination, mode } = formResponse.data

      const todosResponse = await axios.get("/api/todos", {
        params: {
          userId,
        }
      })
      setTodos(todosResponse.data.todos)
      setDisplayOn(true)

      const weatherResponse = await axios.get("/api/weather", {
        params: {
            cityName
        }
      })
        setWeatherData(weatherResponse.data.weatherData)

      const trafficResponse = await axios.get("/api/traffic", {
        params: {
            origin,
            destination,
            mode,
        }
      })
        setTrafficData(trafficResponse.data.trafficData)
    } catch (error) {
      console.error("error finding form data", error);
    }
  };
  return (
    <div>
      <button onClick={handleSampleClick}>Sample</button>
      {displayOn && (

          <SampleDisplay weatherData={weatherData} trafficData={trafficData} todos={todos}/>
      )
      }
    </div>
  );
};

export default SampleButton;
