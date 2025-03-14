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
  const [hasFormData, setHasFormData] = useState<boolean>(false);

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
          const formCity = userFormData.cityName;
          const formOrigin = userFormData.origin;
          const formDestination = userFormData.destination;
          const formMode = userFormData.mode;
          if (formCity || formOrigin || formDestination || formMode) {
            setCityName(formCity);
            setOrigin(formOrigin);
            setDestination(formDestination);
            setMode(formMode);
            setHasFormData(true);
          }
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
      if (hasFormData) {
        const editResponse = await axios.put("/api/form", data);
        console.log("successful FormData edit", editResponse);
      } else {
        const postResponse = await axios.post("/api/form", data);
        console.log("successful FormData entry created", postResponse);
      }
    } catch (error) {
      console.error("form save failure", error);
    }
  }

  return (
    <div>
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

        <div className="flex items-center gap-2 mt-2">
          <button type="submit">save</button>
        </div>
      </form>
      
      <br />
      <br />
      <p>gotta change this for later</p>
      <div>
        <Email userId={userId}/>
      </div>
    </div>
  );
};

export default Form;
