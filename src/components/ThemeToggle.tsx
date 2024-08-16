import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/context/theme-provider";
import React from "react";

export function ThemeToggle(): React.ReactElement {
  const { setTheme } = useTheme();

  return (
    <div className="relative cursor-pointer h-6 w-6 ring-1 ring-light-text dark:ring-dark-text rounded-full text-light-text dark:text-dark-text">
      <Sun
        width={20}
        height={20}
        className="absolute dark:scale-0 scale-100 w-6 top-[2px] left-[0.3px]"
        onClick={() => setTheme("dark")}
      />
      <Moon
        width={20}
        height={20}
        className="absolute dark:scale-100 scale-0 w-6 top-[2px] left-[0.3px]"
        onClick={() => setTheme("light")}
      />
    </div>
  );
}
