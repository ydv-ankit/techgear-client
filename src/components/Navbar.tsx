import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { CartItem } from "./Cart";
import { Logout } from "./Logout";
import { cn } from "@/lib/utils";

export function Navbar(): React.ReactElement {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [navItems, setNavItems] = useState([
    {
      name: "Home",
      href: "/",
    },
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      setNavItems([
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Profile",
          href: "/profile",
        },
        {
          name: "Orders",
          href: "/orders",
        },
      ]);
    } else {
      setNavItems([
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign In",
          href: "/auth",
        },
      ]);
    }
  }, [isAuthenticated]);

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
                      cn(
                        isActive
                          ? "bg-green-400 rounded-md text-zinc-700 p-2"
                          : "p-2",
                        "selection:text-current",
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-4">
          {isAuthenticated && <CartItem />}
          {isAuthenticated && <Logout />}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
