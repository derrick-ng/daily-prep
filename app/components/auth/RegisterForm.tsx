"use client";

import React, { FormEvent } from "react";
import axios from "axios";

const RegisterForm = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await axios.post("../../api/auth/register", data);
      console.log("response:\n", response.data);
    } catch (error) {
      console.error("error sending registration info:\n", error);
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
        <br />

        <label htmlFor="register">register</label>
        <input type="text" name="password" />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
