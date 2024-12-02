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

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            className={`flex w-full items-center justify-between px-2 py-1 text-left focus:outline-none ${isHomePage ? "text-white" : "text-black"}`}
            onClick={() => setSubmenuOpen(!submenuOpen)}
            aria-haspopup="true"
            aria-expanded={submenuOpen}
          >
            <span>{item.name}</span>
            {/* Down/Up Arrow Icon */}
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
                    <NavLink to={child.path ?? "#"} onClick={onClose}>
                      {child.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}
        </>
      ) : (
        <NavLink to={item.path ?? "#"} onClick={onClose}>
          {item.name}
        </NavLink>
      )}
    </li>
  );
};
