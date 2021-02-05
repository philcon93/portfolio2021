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

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            setTheme(JSON.parse(theme));
        }
    }, []);

    const toggleTheme = () => {
        const d = document.documentElement;
        const themes = [lightTheme, darkTheme];

        if (theme == darkTheme) {
            d.classList.remove(...themes);
            d.classList.add(lightTheme);
            localStorage.setItem("theme", JSON.stringify(lightTheme));
            setTheme(lightTheme);
        } else {
            d.classList.remove(...themes);
            d.classList.add(darkTheme);
            // d.setAttribute("class", "dark");
            localStorage.setItem("theme", JSON.stringify(darkTheme));
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
