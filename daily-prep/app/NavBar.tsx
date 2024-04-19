import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "./lib/auth";
import SignOutButton from "./components/SignOutButton";

const NavBar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <nav className="flex space-x-6 mb-5 h-14 px-5 border-b items-center bg-gray-800 text-white">
      <Link href="/">Daily Prep</Link>
      <ul className="flex space-x-6">
        <a href="https://github.com/derrick-ng" target="_blank">
          GitHub
        </a>
        <Link href="/">Instructions</Link>
        <Link href="/">About</Link>
        {session?.user ? (
          <SignOutButton />
        ) : (
          <Link href="/login">Account</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
