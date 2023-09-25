import Link from "next/link";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../../theme/theme-context";
import { MenuToggle } from "./menu-toggle";

export const SidebarNav = ({ showMenu, toggleMenu }) => (
  <aside
    className={`w-full md:w-48 lg:w-64 min-w-64 h-[100dvh] top-0 border-r border-transparent md:border-gray-200 bg-gray-100 dark:bg-gray-800 z-50 fixed md:sticky flex md:flex flex-col justify-between p-8 ${
      showMenu ? "" : "hidden"
    }`}
  >
    <div>
      <MenuToggle toggleMenu={(prevState) => toggleMenu(!prevState)} />
      <nav className="mt-8">
        <NavItem href="/" toggleMenu={toggleMenu}>
          Home
        </NavItem>
        <NavItem href="/about" toggleMenu={toggleMenu}>
          About
        </NavItem>
        <NavItem href="/sketch-book" toggleMenu={toggleMenu}>
          Sketch book
        </NavItem>
      </nav>
    </div>
    <nav>
      <ThemeToggle />
      <SocialLink href="https://www.instagram.com/phil.connah">
        Instagram
      </SocialLink>
      <SocialLink href="https://github.com/philcon93">Github</SocialLink>
      <SocialLink href="https://www.linkedin.com/in/philconnah/">
        Linkedin
      </SocialLink>
    </nav>
  </aside>
);

const NavItem = ({ href, children, toggleMenu }) => (
  <div className="mb-2">
    <Link
      href={href}
      className="text-lg md:text-sm text-gray-600 dark:text-gray-300 font-medium hover:underline"
      onClick={() => toggleMenu(false)}
    >
      {children}
    </Link>
  </div>
);

const moonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);
const sunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <a
        onClick={toggleTheme}
        className="cursor-pointer text-md md:text-xs text-gray-700 dark:text-gray-400"
      >
        {theme === "dark" ? sunIcon() : moonIcon()}
      </a>
    </div>
  );
};

const SocialLink = ({ href, children }) => (
  <div>
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className="text-md md:text-xs text-gray-700 dark:text-gray-400 hover:underline"
    >
      {children}
    </a>
  </div>
);

NavItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  toggleMenu: PropTypes.func,
};

SocialLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

SidebarNav.propTypes = {
  showMenu: PropTypes.bool,
  toggleMenu: PropTypes.func,
};
