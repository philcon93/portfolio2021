import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { MenuToggle, SidebarNav } from "../components/site";
import { ThemeProvider } from "../theme/theme-context";

const MyApp = ({ Component, pageProps }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <ThemeProvider>
      <div className="flex">
        <SidebarNav showMenu={toggleMenu} toggleMenu={onToggleMenu} />
        <div className="w-full h-full">
          <MenuToggle className={"p-8 pb-0"} toggleMenu={onToggleMenu} />
          <Component {...pageProps} />
        </div>
      </div>
      <Analytics />
    </ThemeProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
