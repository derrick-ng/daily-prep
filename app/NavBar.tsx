import { getSession, logout } from "@/lib/session";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const session = await getSession();

  return (
    <div className="flex">
      <div className="flex-1 flex justify-center">
        <Link href="/" className="text-black no-underline">
          <h1>Daily Prep</h1>
        </Link>
      </div>

      <div className="flex">
        {!session ? (
          <div>
            <Link href="/auth/register">
              <button>Register</button>
            </Link>

            <Link href="/auth/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
