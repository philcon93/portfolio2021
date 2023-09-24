import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const darkTheme = "dark";
const lightTheme = "light";

const defaultState = {
  theme: darkTheme,
  toggleTheme: () => {},
};
export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    const doc = document.documentElement;
    const themes = [lightTheme, darkTheme];

    if (theme === darkTheme) {
      doc.classList.remove(...themes);
      doc.classList.add(lightTheme);
      setTheme(lightTheme);
    } else {
      doc.classList.remove(...themes);
      doc.classList.add(darkTheme);
      setTheme(darkTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
