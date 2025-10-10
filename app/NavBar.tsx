import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";
import LogoutButton from "./components/auth/LogoutButton";

const NavBar = async () => {
  const session = await getSession();

  return (
    <div className="relative flex items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="text-black no-underline">
          <div className="text-3xl text-gray-900 font-bold">Daily Prep</div>
        </Link>
      </div>

      <div className="ml-auto flex">
        {!session ? (
          <div>
            <Link href="/instructions">
              <button>Instructions</button>
            </Link>
            <a href="https://www.linkedin.com/in/derrick-ng-b3768527b/" target="_blank">
              <button>LinkedIn</button>
            </a>
            <a href="https://github.com/derrick-ng/daily-prep" target="_blank">
              <button>GitHub</button>
            </a>
            <Link href="/register">
              <button>Register</button>
            </Link>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div className="flex">
            <Link href="/instructions">
              <button>Instructions</button>
            </Link>
            <a href="https://www.linkedin.com/in/derrick-ng-b3768527b/" target="_blank">
              <button>LinkedIn</button>
            </a>
            <a href="https://github.com/derrick-ng/daily-prep" target="_blank">
              <button>GitHub</button>
            </a>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
