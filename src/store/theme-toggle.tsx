"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { size } from "zod";
import { useThemeStore } from "./theme-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark" && !isDarkMode) {
      useThemeStore.setState({ isDarkMode: true });
    } else if (theme === "light" && isDarkMode) {
      useThemeStore.setState({ isDarkMode: false });
    }
  }, [theme, isDarkMode]);

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleToggleTheme}>
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 transition delay-500 ease-in-out duration-300" />
    </Button>
  );
}
