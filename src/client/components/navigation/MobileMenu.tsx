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
  navItems: Array<NavItem>;
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isHomePage, isLoggedIn, isOpen, navItems, onClose, onLogout }) => {
  const [allSubmenusClosed, setAllSubmenusClosed] = useState(false);

  useEffect(() => {
    setAllSubmenusClosed(!isOpen);
  }, [isOpen]);

  const menuClasses = cn(
    "fixed right-0 top-16 h-auto w-auto rounded-bl-2xl pb-20 font-redhat text-lg shadow-md transition-all duration-300 ease-in-out",
    isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-20 opacity-0",
    isHomePage ? "bg-black text-white" : "bg-white text-black",
  );

  const ulClasses = cn("flex w-full flex-col items-end space-y-2 pb-4 pr-4 pt-3");

  return (
    <div className={menuClasses}>
      <ul className={ulClasses}>
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} onClose={onClose} isHomePage={isHomePage} closeAll={allSubmenusClosed} />
        ))}
        <UserButton isLoggedIn={isLoggedIn} onLogout={onLogout} isHomePage={isHomePage} />
      </ul>
    </div>
  );
};

const MobileNavItem: React.FC<{
  item: NavItem;
  onClose: () => void;
  isHomePage: boolean;
  closeAll: boolean;
}> = ({ closeAll, isHomePage, item, onClose }) => {
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
    isHomePage ? "text-white hover:text-[#0f6cb6]" : "text-black hover:text-[#0f6cb6]",
  );

  const svgClasses = cn("mr-1 h-4 w-4 transition-transform duration-300");

  const gradientClasses = cn(
    "mr-4 mt-1 w-auto bg-gradient-to-r transition-all duration-500 ease-in-out",
    isHomePage ? "from-saseGreen via-saseBlue to-black" : "from-saseBlue via-saseGreen to-white",
    submenuOpen
      ? "pointer-events-auto max-h-screen translate-y-0 transform opacity-100"
      : "pointer-events-none max-h-0 -translate-y-2 transform opacity-0",
  );

  const childUlClasses = cn("flex w-full flex-col items-end space-y-1", isHomePage ? "text-white" : "text-black");

  const childButtonClasses = cn("block w-full px-2 py-2 text-right transition-transform duration-300 hover:scale-110");

  return (
    <li className={liClasses}>
      <button className={buttonClasses} onClick={handleClick} aria-haspopup="true" aria-expanded={submenuOpen}>
        {item.name === "Home" && <Icon icon="oui:home" className="mr-2 h-4 w-4" />}
        {item.children && item.children.length > 0 && (
          <svg
            className={svgClasses}
            style={{ transform: submenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
        <span>{item.name}</span>
      </button>
      {item.children && item.children.length > 0 && (
        <div className={gradientClasses}>
          <ul className={childUlClasses}>
            {item.children.map(
              (child) =>
                child.path && (
                  <li key={child.name} className="w-full">
                    <button
                      onClick={() => {
                        router.navigate({ to: child.path });
                        onClose();
                      }}
                      className={childButtonClasses}
                    >
                      {child.name}
                    </button>
                  </li>
                ),
            )}
          </ul>
        </div>
      )}
    </li>
  );
};
