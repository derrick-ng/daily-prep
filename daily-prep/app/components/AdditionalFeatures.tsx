"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, RadioGroup, TextField, Text, DropdownMenu, Flex, Callout } from "@radix-ui/themes";

interface AdditionalFeatureForm {
  weather: boolean;
  weatherCity: string;
  email: boolean;
  emailPriority: string;
  eta: boolean;
  etaStart: string;
  etaEnd: string;
  modeOfTransportation: number;
}

const AdditionalFeatures = () => {
  const { register, handleSubmit } = useForm<AdditionalFeatureForm>();
  const [error, setError] = useState("");

  return (
    <div className="w-1/2 border-solid border-2 border-black">
      <form
        className=""
        onSubmit={handleSubmit(async (data) => {
          try {
            //send a GET request to check if user already created row
            const response = await axios.get("api/additionalInfo");

            if (!response.data) {
              await axios.post("api/additionalInfo", data);
            } else if (response.data) {
              await axios.put("/api/additionalInfo", data);
            }
          } catch (error) {
            setError("Error occurred, can not save");
          }
        })}
      >
        <h3 className="text-center text-2xl">Additional Features</h3>
        <div>
          <input type="checkbox" id="weather-checkbox" {...register("weather")} />
          <label htmlFor="weather-checkbox">Weather</label>
          <TextField.Input placeholder="City" {...register("weatherCity")} />
        </div>

        <div>
          <div>
            <input type="checkbox" id="email-checkbox" {...register("email")} />
            <label htmlFor="email-checkbox">Email</label>
          </div>
          <div>
            <TextField.Root>
              <TextField.Input placeholder="Enter email sender priority" {...register("emailPriority")} />
            </TextField.Root>
          </div>
        </div>

        <div>
          <div>
            <input type="checkbox" id="eta-checkbox" {...register("eta")} />
            <label htmlFor="eta-checkbox">eta</label>
          </div>
          <div>
            <TextField.Input placeholder="Start Location" {...register("etaStart")} />
            <TextField.Input placeholder="End Location" {...register("etaEnd")} />

            <RadioGroup.Root defaultValue="1" {...register("modeOfTransportation")}>
              <RadioGroup.Item value="1" /> Drive (default)
              <Text as="label">
                <RadioGroup.Item value="2" className="ml-8" /> Public Transport
              </Text>
              <Text as="label">
                <RadioGroup.Item value="3" className="ml-8" /> Walk
              </Text>
              <Text as="label">
                <RadioGroup.Item value="4" className="ml-8" /> Bike
              </Text>
            </RadioGroup.Root>
          </div>
        </div>
        <Button className="float-right">Save Preferences</Button>
      </form>
    </div>
  );
};

export default AdditionalFeatures;
