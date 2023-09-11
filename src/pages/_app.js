import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { MenuToggle, SidebarNav } from "../components/site";
import { ThemeProvider } from "../theme/theme-context";

const MyApp = ({ Component, pageProps }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex">
        <SidebarNav
          showMenu={toggleMenu}
          toggle={() => setToggleMenu(!toggleMenu)}
        />
        <div className="w-full">
          <MenuToggle toggle={() => setToggleMenu(!toggleMenu)} />
          <div className="p-4 md:p-8 lg:max-w-2xl lg:mx-auto text-gray-600 dark:text-gray-300">
            <Component {...pageProps} />
          </div>
        </div>
        {/* <GoatScene /> */}
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
