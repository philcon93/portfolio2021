import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const defaultState = {
  dark: false,
  toggleDark: () => {},
};
export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const lsDark = localStorage.getItem("dark");
        if (lsDark !== null) {
            setDark(JSON.parse(lsDark));
        }
    }, []);

    const toggleDark = () => {
        const d = document.documentElement;
        const themes = ["light", "dark"];

        if (dark) {
            d.classList.remove(...themes);
            d.classList.add("light");
        } else {
            d.setAttribute("class", "dark");
        }

        localStorage.setItem("dark", JSON.stringify(!dark));
        setDark(!dark);
    };

    return (
        <ThemeContext.Provider value={{ dark, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node
};
