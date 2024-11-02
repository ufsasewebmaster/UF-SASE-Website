// src/components/Navbar/MobileMenu.tsx
import React from "react";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  navItems: Array<{ name: string; path: string }>;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  onClose,
}) => (
  <div
    className={`nav-links absolute w-full bg-white transition-all duration-500 ease-in-out md:hidden ${
      isOpen ? "top-16" : "-top-full"
    }`}
  >
    <ul className="flex flex-col items-end gap-8 py-4 pr-12">
      {navItems.map((item) => (
        <li key={item.name}>
          <NavLink to={item.path} onClick={onClose}>
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);
