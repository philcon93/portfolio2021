import '../styles/index.css';
import { useState } from 'react';
import { MenuToggle, SidebarNav } from '../components';

function MyApp({ Component, pageProps }) {
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <div className="flex bg-gray-100 dark-mode:bg-gray-800">
      <SidebarNav showMenu={toggleMenu} />
      <div className="w-full">
        <MenuToggle toggle={() => setToggleMenu(!toggleMenu)} />
        <div className="p-4 md:p-8 lg:max-w-xl lg:mx-auto text-gray-600 dark:text-gray-300">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
