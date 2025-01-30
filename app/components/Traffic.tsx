"use client"

import axios from "axios";
import { useState } from "react";

const Traffic = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState("");
  const [avoid, setAvoid] = useState("");
  const [trafficData, setTrafficData] = useState<any>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.get("/api/traffic", {
        params: { origin: origin, destination: destination, mode: mode, avoid: avoid },
      });
      setTrafficData(response.data);
    } catch (error) {
      console.log("error in traffic", error);
    }
  };

  return (
    <div>
      <h2>Distance Matrix AI Test</h2>
      <h3>**i believe distance matrix ai avoid feature is currently not working**</h3>
      <div>
        <label htmlFor="origin">Start Address</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => {
            setOrigin(e.target.value);
          }}
        />

        <label htmlFor="destination">End Address</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />

        <label htmlFor="transportationMode">Modes of Transportation</label>
        <select
          name="transportationMode"
          id=""
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          <option value="driving">driving</option>
          <option value="walking">walking</option>
          <option value="bicycling">biking</option>
          <option value="transit">transit</option>
        </select>

        <label htmlFor="restriction">Restrictions (only one)</label>
        <select
          name="restriction"
          id=""
          value={avoid}
          onChange={(e) => {
            setAvoid(e.target.value);
          }}
        >
          <option value="none">none</option>
          <option value="tolls">tolls</option>
          <option value="highways">highways</option>
          <option value="ferries">ferries</option>
          <option value="indoor">indoor</option>
        </select>

        <button onClick={handleSubmit}>submit</button>
      </div>

      {trafficData && (
        <div>
          <p>
            {trafficData.distance} miles, {trafficData.duration} minutes
          </p>
        </div>
      )}
    </div>
  );
};

export default Traffic;
