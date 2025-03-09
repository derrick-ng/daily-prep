"use client";

import { FormEvent, useEffect, useState } from "react";
import Email from "./Email";
import axios from "axios";

interface FormProps {
  userId: string | null;
}

const Form = ({ userId }: FormProps) => {
  const [cityName, setCityName] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [mode, setMode] = useState<string>("");

  useEffect(() => {
    async function getFormData() {
      if (userId) {
        try {
          const response = await axios.get("/api/form", {
            params: {
              userId,
            },
          });
          const userFormData = response.data;
          setCityName(userFormData.cityName);
          setOrigin(userFormData.origin);
          setDestination(userFormData.destination);
          setMode(userFormData.mode);
        } catch (error) {
          console.error("error in Form useEffect:", error);
        }
      }
    }
    getFormData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    const data = {
      userId: userId,
      cityName: formData.get("cityName"),
      origin: formData.get("origin"),
      destination: formData.get("destination"),
      mode: formData.get("mode"),
    };

    //post request -> Form api endpoint
    // userId, cityName, origin, destination, mode
    // Form api endpoint = create FormData entry
    event.preventDefault();

    try {
      const response = await axios.post("/api/form", data);
      console.log("successful FormData entry created", response);
      console.log("successful form save");
    } catch (error) {
      console.error("form save failure", error);
    }
  }

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">City Name:</label>
        <input type="text" id="cityName" name="cityName" defaultValue={cityName} />
        <br />

        <label htmlFor="origin">Start Address</label>
        <input type="text" name="origin" defaultValue={origin} />
        <br />

        <label htmlFor="destination">End Address</label>
        <input type="text" name="destination" defaultValue={destination} />
        <br />

        <label htmlFor="transportationMode">Modes of Transportation</label>
        <select name="mode" id="" defaultValue={mode}>
          <option value="driving">driving</option>
          <option value="walking">walking</option>
          <option value="bicycling">biking</option>
          <option value="transit">transit</option>
        </select>
        <br />

        <button type="submit">save</button>
      </form>
      <div>
        <Email />
      </div>
    </div>
  );
};

export default Form;
