import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/context/theme-provider";
import React from "react";

export function ThemeToggle(): React.ReactElement {
  const { setTheme } = useTheme();

  return (
    <div className="relative cursor-pointer h-4 w-4 ring-1 ring-light-text dark:ring-dark-text rounded-full text-light-text dark:text-dark-text">
      <Sun
        className="absolute dark:scale-0 scale-100 w-3 -top-[4px] left-[2.5px]"
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="absolute dark:scale-100 scale-0 w-3 -top-[4px] left-[2.5px]"
        onClick={() => setTheme("light")}
      />
    </div>
  );
}
