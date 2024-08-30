import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { CartIcon } from "./CartIcon";
import { Logout } from "./Logout";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

export function Navbar(): React.ReactElement {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
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
    <nav className="p-2 w-full z-10 border-b">
      <div className="md:flex md:w-3/5 hidden justify-between mx-auto">
        <div className="flex items-center justify-center gap-2">
          <img src="logo.png" alt="logo" className="w-6 h-6 antialiased" />
          <span className="italic font-bold">TechGear</span>
        </div>
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
                          ? "bg-green-400 text-zinc-700 p-2"
                          : "p-2 hover:bg-green-800",
                        "selection:text-current rounded-md",
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
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              cn(
                isActive
                  ? "bg-green-400 text-zinc-700 p-2"
                  : "p-2 hover:bg-green-800",
                "rounded-full",
              )
            }
          >
            {isAuthenticated && <CartIcon />}
          </NavLink>
          {isAuthenticated && <Logout />}
          <ThemeToggle />
        </div>
      </div>
      <div
        className={cn(
          isNavbarOpen ? "h-fit" : "h-8",
          "md:hidden md:w-3/5 flex flex-col justify-between mx-auto items-center",
        )}
      >
        <div className="flex justify-between h-8 items-center w-full">
          {isNavbarOpen ? (
            <Cross1Icon onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
          ) : (
            <HamburgerMenuIcon onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
          )}
          <div className="flex justify-center items-center gap-2 md:gap-4">
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                cn(
                  isActive
                    ? "bg-green-400 text-zinc-700 p-2"
                    : "p-2 hover:bg-green-800",
                  "rounded-full",
                )
              }
            >
              {isAuthenticated && <CartIcon />}
            </NavLink>
            {isAuthenticated && <Logout />}
            <ThemeToggle />
          </div>
        </div>
        {isNavbarOpen && (
          <div>
            <ul className="flex flex-col gap-4 text-sm">
              {navItems.map((item, idx) => {
                return (
                  <li className="px-2 py-1" key={idx}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          isActive
                            ? "bg-green-400 text-zinc-700 p-2"
                            : "p-2 hover:bg-green-800",
                          "selection:text-current rounded-md",
                        )
                      }
                      onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
