import Link from 'next/link';
import { CMS_NAME } from '../utilities/constants';

const NavItem = ({ href, children }) => (
  <div className="mb-2">
    <Link href={href}>
        <a className="text-sm text-gray-600 dark:text-gray-300 font-medium hover:underline">
          {children}
        </a>
    </Link>
  </div>
);

const SocialLink = ({ href, children }) => (
  <div>
    <a target="_blank" rel="noreferrer" href={href} className="text-xs text-gray-700 dark:text-gray-400 hover:underline">
      {children}
    </a>
  </div>
);

export const SidebarNav = ({ showMenu }) => (
  <aside className={`w-3/5 md:w-48 lg:w-64 h-screen sticky top-0 border-r border-gray-200 flex flex-col justify-between p-8 md:flex ${showMenu ? 'hidden' : ''}`}>
    <div>
      <Link href="/">
        <a href="/" className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 dark:text-gray-400">
          {CMS_NAME}
        </a>
      </Link>
      <nav className="mt-8">
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/sketch">Sketches</NavItem>
        <NavItem href="/about">About</NavItem>
      </nav>
    </div>
    <nav>
      <SocialLink href="https://www.instagram.com/phillycheese93">Instagram</SocialLink>
      <SocialLink href="https://github.com/philcon93">Github</SocialLink>
      <SocialLink href="https://www.linkedin.com/in/philconnah/">Linkedin</SocialLink>
    </nav>
  </aside>
);
