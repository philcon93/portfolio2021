import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MenuToggle, SidebarNav } from "../components/site";
import { ThemeProvider } from "../theme/theme-context";

const useDocumentOverflowHidden = (toggleMenu, pathname) => {
  useEffect(() => {
    const doc = document.documentElement;
    const overflowHiddenClass = "overflow-hidden";

    if (toggleMenu && pathname !== "/") {
      doc.classList.add(overflowHiddenClass);
    } else if (!toggleMenu && pathname !== "/") {
      doc.classList.remove(overflowHiddenClass);
    } else if (!toggleMenu && pathname === "/") {
      doc.classList.add(overflowHiddenClass);
    }
  }, [toggleMenu, pathname]);
};

const MyApp = ({ Component, pageProps }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  useDocumentOverflowHidden(toggleMenu, router.pathname);

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <ThemeProvider>
      <div className="flex">
        <SidebarNav showMenu={toggleMenu} toggleMenu={onToggleMenu} />
        <div className="w-full h-full">
          <MenuToggle
            className={"p-8 pb-0 z-50 relative"}
            toggleMenu={onToggleMenu}
          />
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
