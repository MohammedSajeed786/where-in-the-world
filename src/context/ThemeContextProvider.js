import React, { createContext, useState } from "react";
export const ThemeContext = createContext(null);
export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("light");
  const updateTheme = (theme) => {
    if (theme == "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <ThemeContext.Provider value={{theme,updateTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
}
