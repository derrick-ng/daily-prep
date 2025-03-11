import React from "react";
import { WeatherData } from "@/app/types/Weather";
import { TrafficData } from "@/app/types/Traffic";
import { Todo } from "@/app/types/Todo";

interface SampleDisplayProp {
  weatherData: WeatherData | null;
  trafficData: TrafficData | null;
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
        {todos.map((todo) => 
        <p key={todo.id}>{todo.task}</p>)}
      </div>
    </div>
  );
};

export default SampleDisplay;
