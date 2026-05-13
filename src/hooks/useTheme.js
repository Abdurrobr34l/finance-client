import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("wealthwise-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("wealthwise-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};

export default useTheme;