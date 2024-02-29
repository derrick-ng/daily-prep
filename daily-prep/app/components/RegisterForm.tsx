"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface RegisterForm {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RegisterForm>();

  return (
    <form
      className="w-1/2"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("api/users", data)
        router.push("/login")
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
