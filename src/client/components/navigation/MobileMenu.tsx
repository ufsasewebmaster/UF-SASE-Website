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
    if (!isOpen) setAllSubmenusClosed(true);
    else setAllSubmenusClosed(false);
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed right-0 top-16 h-auto w-auto rounded-bl-2xl pb-10 pl-6 font-redhat shadow-md transition-all duration-300 ease-in-out",
        isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-20 opacity-0",
        isHomePage ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <ul className="flex flex-col items-end space-y-2 p-5">
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} onClose={onClose} isHomePage={isHomePage} closeAll={allSubmenusClosed} />
        ))}
        <UserButton isLoggedIn={isLoggedIn} onLogout={onLogout} isHomePage={isHomePage} />
      </ul>
    </div>
  );
};

const MobileNavItem: React.FC<{ item: NavItem; onClose: () => void; isHomePage: boolean; closeAll: boolean }> = ({
  closeAll,
  isHomePage,
  item,
  onClose,
}) => {
  const router = useRouter();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    if (closeAll) setSubmenuOpen(false);
  }, [closeAll]);

  const handleClick = () => {
    if (submenuOpen && item.path) {
      router.navigate({ to: item.path });
      onClose();
    } else setSubmenuOpen(!submenuOpen);
  };

  return (
    <li className="text-right">
      <button
        className={cn(
          "flex w-full items-center justify-end px-2 py-1 text-right transition-colors duration-300 focus:outline-none",
          isHomePage ? "text-white hover:text-[#0f6cb6]" : "text-black hover:text-[#0f6cb6]",
        )}
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={submenuOpen}
      >
        {item.name === "Home" && <Icon icon="oui:home" className="mr-2 h-4 w-4" />}
        {item.children && item.children.length > 0 && (
          <svg
            className="mr-1 h-4 w-4 transition-transform duration-300"
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
        <div
          className={cn(
            `mr-6 mt-1 w-full bg-gradient-to-r ${isHomePage ? "from-saseGreen via-saseBlue to-black" : "from-saseGreen via-saseBlue to-white"} transition-all duration-500 ease-in-out`,
            submenuOpen
              ? "pointer-events-auto max-h-screen translate-y-0 transform opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 transform opacity-0",
          )}
        >
          <ul className={`flex w-full flex-col items-end space-y-1 ${isHomePage ? "text-white" : "text-black"}`}>
            {item.children.map(
              (child) =>
                child.path && (
                  <li key={child.name} className="w-full">
                    <button
                      onClick={() => {
                        router.navigate({ to: child.path });
                        onClose();
                      }}
                      className="block w-full px-2 py-2 text-right transition-transform duration-300 hover:scale-110"
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
