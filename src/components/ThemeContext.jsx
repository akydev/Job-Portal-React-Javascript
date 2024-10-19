import React, { createContext, useState, useContext } from "react";
import { createTheme } from "@mui/material/styles";

const ThemeContextProvider = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light"); // Default theme

  const theme = createTheme({
    palette: {
      mode: themeName,
      ...(themeName === "light"
        ? {
            primary: {
              main: "#ff5722",
            },
            secondary: {
              main: "#03a9f4",
            },
          }
        : {
            primary: {
              main: "#121212",
            },
            secondary: {
              main: "#bb86fc",
            },
          }),
    },
  });

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContextProvider.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContextProvider.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContextProvider);
};
