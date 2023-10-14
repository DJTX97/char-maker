import { useState, useEffect } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="absolute top-5 right-10">
      <button
        onClick={handleThemeChange}
        className="p-2 rounded-xl bg-white dark:bg-black dark:text-white"
      >
        {theme}
      </button>
    </div>
  );
}
