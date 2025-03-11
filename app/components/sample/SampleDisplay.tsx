import React from "react";
import { weatherData } from "@/app/types/Weather";
import { trafficData } from "@/app/types/Traffic";

interface Todo {
  id: number;
  task: string;
}

interface SampleDisplayProp {
  weatherData: weatherData | null;
  trafficData: trafficData | null;
  todos: Todo[]
}

const SampleDisplay = ({ weatherData, trafficData, todos }: SampleDisplayProp) => {
  const { temp, tempMin, tempMax } = weatherData || {};
  const { distance, duration } = trafficData || {};

  return (
    <div>
      <div>
        <p>{temp}°F</p>
        <div>
            <p>{tempMin}-{tempMax}</p>
        </div>
      </div>
      <div>
        <p>{distance} miles, {duration} minutes</p>
      </div>
      <div>
        {todos.map((todo, index) => 
        <p key={index}>{todo.task}</p>)}
      </div>
    </div>
  );
};

export default SampleDisplay;
