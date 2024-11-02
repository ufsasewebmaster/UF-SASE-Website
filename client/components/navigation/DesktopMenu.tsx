// src/components/Navbar/DesktopMenu.tsx
import React from "react";
import { NavLink } from "./NavLink";

interface DesktopMenuProps {
  navItems: Array<{ name: string; path: string }>;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems }) => (
  <ul className="mr-auto flex items-center gap-[3vw] px-10 pt-1 md:flex-row">
    {navItems.map((item) => (
      <li key={item.name}>
        <NavLink to={item.path}>{item.name}</NavLink>
      </li>
    ))}
  </ul>
);
