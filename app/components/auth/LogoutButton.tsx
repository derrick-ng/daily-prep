"use client";

import React from "react";
import { logout } from "@/lib/session";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.refresh();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
