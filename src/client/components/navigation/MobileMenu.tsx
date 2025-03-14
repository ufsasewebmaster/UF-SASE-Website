import { cn } from "@/shared/utils";
import { Icon } from "@iconify/react";
import { UserButton } from "@navigation/UserButton";
import { useRouter } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

interface NavItem {
  name: string;
  path?: string;
  children?: Array<NavItem>;
}

interface MobileMenuProps {
  darkMode: boolean;
  isHomePage: boolean;
  isLoggedIn: boolean;
  isOpen: boolean;
  navItems: Array<NavItem>;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ darkMode, isHomePage, isLoggedIn, isOpen, navItems, onClose, onLogout }) => {
  const [allSubmenusClosed, setAllSubmenusClosed] = useState(false);

  useEffect(() => {
    setAllSubmenusClosed(!isOpen);
  }, [isOpen]);

  const menuClasses = cn(
    "fixed right-0 top-16 h-auto w-auto rounded-bl-2xl pb-20 font-redhat text-lg shadow-md transition-all duration-300 ease-in-out",
    isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-20 opacity-0",
    isHomePage || darkMode ? "bg-black text-white" : "bg-white text-black",
  );

  const ulClasses = cn("flex w-full flex-col items-end space-y-2 pb-4 pr-4 pt-3");

  return (
    <div className={menuClasses}>
      <ul className={ulClasses}>
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} onClose={onClose} isHomePage={isHomePage} closeAll={allSubmenusClosed} darkMode={darkMode} />
        ))}
        <UserButton isLoggedIn={isLoggedIn} onLogout={onLogout} isHomePage={isHomePage} />
      </ul>
    </div>
  );
};

const MobileNavItem: React.FC<{
  darkMode: boolean;
  isHomePage: boolean;
  item: NavItem;
  onClose: () => void;
  closeAll: boolean;
}> = ({ closeAll, darkMode, isHomePage, item, onClose }) => {
  const router = useRouter();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    if (closeAll) setSubmenuOpen(false);
  }, [closeAll]);

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      if (submenuOpen) {
        if (item.path) {
          router.navigate({ to: item.path });
          onClose();
        }
      } else {
        setSubmenuOpen(true);
      }
    } else if (item.path) {
      router.navigate({ to: item.path });
      onClose();
    }
  };

  const liClasses = cn("w-full text-right");

  const buttonClasses = cn(
    "flex w-full items-center justify-end px-2 py-1 pl-20 text-right transition-colors duration-300 focus:outline-none",
    isHomePage || darkMode ? "text-white hover:text-[#0f6cb6]" : "text-black hover:text-[#0f6cb6]",
  );

  return (
    <li className={liClasses}>
      <button className={buttonClasses} onClick={handleClick} aria-haspopup="true" aria-expanded={submenuOpen}>
        {item.name === "Home" && <Icon icon="oui:home" className="mr-2 h-4 w-4" />}
        <span>{item.name}</span>
      </button>
    </li>
  );
};
