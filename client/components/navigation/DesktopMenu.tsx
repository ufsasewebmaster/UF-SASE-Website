// src/components/Navbar/DesktopMenu.tsx
import React from "react";
import { NavLink } from "./NavLink";

interface DesktopMenuProps {
  navItems: Array<{ name: string; path: string }>;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems }) => (
  <ul className="flex md:flex-row items-center gap-[3vw] mr-auto px-10 pt-1">
    {navItems.map((item) => (
      <li key={item.name}>
        <NavLink to={item.path}>{item.name}</NavLink>
      </li>
    ))}
  </ul>
);