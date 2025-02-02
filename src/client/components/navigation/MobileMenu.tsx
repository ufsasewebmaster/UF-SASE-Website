import React, { useState } from "react";
import { NavLink } from "./NavLink";

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
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isHomePage, isOpen, navItems, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute left-0 top-16 z-40 w-full shadow-md ${isHomePage ? "bg-black text-white" : "bg-white text-black"}`}>
      <ul className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} onClose={onClose} isHomePage={isHomePage} />
        ))}
      </ul>
    </div>
  );
};

const MobileNavItem: React.FC<{
  item: NavItem;
  onClose: () => void;
  isHomePage: boolean;
}> = ({ isHomePage, item, onClose }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (submenuOpen && ["About", "Events", "Programs"].includes(item.name)) {
      window.location.href = item.path ?? "#";
    } else {
      setSubmenuOpen(!submenuOpen);
    }
  };

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            className={`flex w-full items-center justify-between px-2 py-1 text-left transition-colors duration-300 focus:outline-none ${
              isHomePage ? "text-white hover:text-[#0f6cb6]" : "text-black hover:text-[#0f6cb6]"
            }`}
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={submenuOpen}
          >
            <span>{item.name}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {submenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
          {submenuOpen && (
            <ul className="ml-4 mt-1 flex flex-col space-y-1">
              {Array.isArray(item.children) &&
                item.children.map((child) => (
                  <li key={child.name}>
                    <NavLink to={child.path ?? "#"} onClick={onClose} className="block px-2 py-2 transition-colors duration-300 hover:text-[#0f6cb6]">
                      {child.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}
        </>
      ) : (
        <NavLink to={item.path ?? "#"} onClick={onClose} className="block px-2 py-2 transition-colors duration-300 hover:text-[#0f6cb6]">
          {item.name}
        </NavLink>
      )}
    </li>
  );
};