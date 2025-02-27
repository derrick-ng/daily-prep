import React from "react";
import LoginForm from "@/app/components/auth/LoginForm";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  
  return (
    <div>
      <LoginForm />
    </div>
  );
}
