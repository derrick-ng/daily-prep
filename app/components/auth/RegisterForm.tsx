"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await axios.post("/api/auth/register", data);
      setSuccess("Registration Success");
      setErrors([]);
      console.log("Registration success:\n", response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;

        const errors = errorData?.errors || [errorData?.error]
        setErrors(Array.isArray(errors) ? errors : [errors])
        // setErrors(errors);
        // errors.map((err: string) => console.log("error:", err));
        // console.error("error sending registration info:\n", error.response?.data.errors[1]);
      } else {
        console.error("error sending registration: info\n", error);
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" name="username" />
        <br />

        <label htmlFor="email">email</label>
        <input type="text" name="email" />
        {/* <input type="email" name="email"/> */}
        <br />

        <label htmlFor="register">password</label>
        <input type="password" name="password" />
        <br />

        <button type="submit">Register</button>
        {(success || errors.length > 0) && (
          <div>
            {success && <p>{success}</p>}
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
