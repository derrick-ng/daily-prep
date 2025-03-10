"use client";

import React from "react";
import { logout } from "@/lib/session";

const LogoutButton = () => {

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
