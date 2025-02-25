import React from "react";
import LoginForm from "@/app/components/auth/LoginForm";
import { getSession, logout } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  
  return (
    <div>
      {session && (
        <div>
          <p>{session?.[0].user.username}</p>
          <button onClick={await logout}>logout</button>
        </div>
      )}
      <LoginForm />
    </div>
  );
}
