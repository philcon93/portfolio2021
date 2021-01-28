const NavItem = ({ href, children}) => {
    return (
        <div className="mb-2">
            <a href={href} className="text-sm text-gray-600 dark:text-gray-300 font-medium hover:underline">
                {children}
            </a>
        </div>
    )
};

const SocialLink = ({ href, children}) => {
    return (
        <div>
            <a target="_blank" href={href} className="text-xs text-gray-700 dark:text-gray-400 hover:underline">
                {children}
            </a>
        </div>
    );
};

export const SidebarNav = ({ showMenu }) => {
  return (
    <aside className={`w-3/5 h-screen sticky top-0 border-r border-gray-200 flex flex-col justify-between p-8 md:flex md:w-48 lg:w-64 ${showMenu ? 'hidden' : '' }`}>
        <div>
            <a href="/" className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 dark:text-gray-600">Goat</a>
            <nav className="mt-8">
                <NavItem href="/blog">Blog</NavItem>
                <NavItem href="/sketch">Sketches</NavItem>
                <NavItem href="/about">About</NavItem>
            </nav>
        </div>
        <nav>
            <SocialLink href="/blog">Instagram</SocialLink>
            <SocialLink href="/blog">Github</SocialLink>
            <SocialLink href="/blog">Linkedin</SocialLink>
        </nav>
    </aside>
  );
};
