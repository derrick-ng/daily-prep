"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

interface RegisterForm {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();

  return (
    <form
      className="w-1/2"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("api/users", data)
      })}
    >
      <TextField.Input placeholder="username" {...register("username")} />
      <TextField.Input placeholder="email" {...register("email")} />
      <TextField.Input placeholder="phone number" {...register("phoneNumber")} />
      <TextField.Input placeholder="password" {...register("password")} />
      <Button>Register</Button>
    </form>
  );
};

export default RegisterForm;
