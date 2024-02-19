import Link from "next/link";
import React from "react";

const NavBar = () => {
  const links = [
    { label: "Instructions", href: "/" },
    { label: "About Me", href: "/" },
    { label: "Account", href: "/users" },
  ];

  return (
    <nav className="flex space-x-6 mb-5 h-14 px-5 border-b items-center">
      <Link href="/">Daily Prep</Link>
      <ul className="flex space-x-6">
        <a href="https://github.com/derrick-ng" target="_blank">
          GitHub
        </a>
        {links.map((link) => (
          <Link key={link.href} className="" href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
