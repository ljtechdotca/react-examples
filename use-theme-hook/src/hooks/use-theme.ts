import { createContext, useContext, useEffect } from "react";
import { parseCookie } from "../helpers/parse-cookie";

export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>({ theme: "light", setTheme: () => {} });

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = (theme: string) => {
    document.cookie = `theme=${theme}; path=/;`;
    setTheme(theme);
  };

  useEffect(() => {
    const cookies = parseCookie(document.cookie);
    console.log({ cookies });
    setTheme(cookies.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return { theme, switchTheme };
};
