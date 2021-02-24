import '../styles/globals.css';
import { useState } from 'react';
import { MenuToggle, SidebarNav } from '../components';
import PropTypes from 'prop-types';
import { ThemeProvider } from "../theme/theme-context";

const MyApp = ({ Component, pageProps }) => {
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <ThemeProvider>
      <div className="flex">
        <SidebarNav showMenu={toggleMenu} />
        <div className="w-full">
          <MenuToggle toggle={() => setToggleMenu(!toggleMenu)} />
          <div className="p-4 md:p-8 lg:max-w-2xl lg:mx-auto text-gray-600 dark:text-gray-300">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
