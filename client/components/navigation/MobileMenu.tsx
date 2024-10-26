// src/components/navigation/MobileMenu.tsx

import React, { useState } from "react";
import { NavLink } from "./NavLink"; // Adjust the import path as needed

interface NavItem {
  name: string;
  path?: string;
  children?: Array<NavItem>;
}

interface MobileMenuProps {
  navItems: Array<NavItem>;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40">
      <ul className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <MobileNavItem key={item.name} item={item} onClose={onClose} />
        ))}
      </ul>
    </div>
  );
};

const MobileNavItem: React.FC<{ item: NavItem; onClose: () => void }> = ({ item, onClose }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            className="flex items-center justify-between w-full px-2 py-1 text-left focus:outline-none"
            onClick={() => setSubmenuOpen(!submenuOpen)}
            aria-haspopup="true"
            aria-expanded={submenuOpen}
          >
            <span>{item.name}</span>
            {/* Down/Up Arrow Icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {submenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
          {submenuOpen && (
            <ul className="mt-1 ml-4 flex flex-col space-y-1">
              {item.children!.map((child) => (
                <li key={child.name}>
                  <NavLink to={child.path!} onClick={onClose}>
                    {child.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <NavLink to={item.path!} onClick={onClose}>
          {item.name}
        </NavLink>
      )}
    </li>
  );
};
