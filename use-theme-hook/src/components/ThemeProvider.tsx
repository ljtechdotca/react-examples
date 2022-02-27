import React, { useState } from "react";
import { ThemeContext } from "../hooks/use-theme";

interface ThemeProviderProps {}

const ThemeProvider = ({
  children,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
