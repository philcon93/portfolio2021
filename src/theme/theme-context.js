import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const defaultState = {
  dark: false,
  toggleDark: () => {},
};
export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);
    const darkTheme = 'dark';
    const lightTheme = 'light';

    const toggleTheme = () => {
        const d = document.documentElement;
        const themes = [lightTheme, darkTheme];

        if (theme == darkTheme) {
            d.classList.remove(...themes);
            d.classList.add(lightTheme);
            setTheme(lightTheme);
        } else {
            d.classList.remove(...themes);
            d.classList.add(darkTheme);
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
    children: PropTypes.node
};
