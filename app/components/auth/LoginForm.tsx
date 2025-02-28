"use client";

import { FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("/api/auth/login", data);
      console.log("login response: ", response);

      // sends to home page and refreshes to show proper page content (logout button & user info)
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("login error: ", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" name="username" />
        <br />

        <label htmlFor="password">password</label>
        <input type="password" name="password" />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
