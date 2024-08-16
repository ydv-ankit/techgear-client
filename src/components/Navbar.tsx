import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import React from "react";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Sign In",
    href: "/auth",
  },
];

export function Navbar(): React.ReactElement {
  return (
    <nav className="p-2 w-full">
      <div className="md:w-3/5 flex justify-between mx-auto">
        <div>Logo</div>
        <div>
          <ul className="flex md:gap-4 text-sm">
            {navItems.map((item, idx) => {
              return (
                <li className="px-2 py-1" key={idx}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-green-400 rounded-md text-zinc-700 p-2"
                        : "p-2"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            <ThemeToggle />
          </ul>
        </div>
      </div>
    </nav>
  );
}
