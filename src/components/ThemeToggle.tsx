import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/context/theme-provider";
import React from "react";

export function ThemeToggle(): React.ReactElement {
  const { setTheme } = useTheme();

  return (
    <div className="dark:hover:bg-green-400 w-8 h-8 flex items-center justify-center rounded-full dark:text-dark-text dark:hover:text-light-text cursor-pointer">
      <div className="relative h-6 w-6 ring-1 ring-light-text dark:ring-dark-text rounded-full p-2">
        <Sun
          className="absolute dark:scale-0 scale-100 w-5 -top-[1px] left-[2.5px]"
          onClick={() => setTheme("dark")}
        />
        <Moon
          className="absolute dark:scale-100 scale-0 w-5 -top-[1px] left-[2.5px]"
          onClick={() => setTheme("light")}
        />
      </div>
    </div>
  );
}
