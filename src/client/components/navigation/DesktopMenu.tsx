import { cn } from "@/shared/utils";
import React, { useState } from "react";
import { NavLink } from "./NavLink";

interface NavItem {
  name: string;
  path?: string;
  children?: Array<NavItem>;
}

export const DesktopMenu: React.FC<{
  navItems: Array<NavItem>;
  isHomePage: boolean;
  darkMode: boolean;
}> = ({ isHomePage, navItems, darkMode }) => {
  return (
    <ul className="flex space-x-6">
      {navItems.map((item) => (
        <NavItemComponent key={item.name} item={item} isHomePage={isHomePage} darkMode={darkMode} />
      ))}
    </ul>
  );
};

const NavItemComponent: React.FC<{ item: NavItem; isHomePage: boolean; darkMode: boolean }> = ({ isHomePage, item, darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li
      className="group relative"
      onMouseEnter={() => hasChildren && setDropdownOpen(true)}
      onMouseLeave={() => hasChildren && setDropdownOpen(false)}
    >
      {hasChildren ? (
        <>
          {/* Parent item (clickable and triggers dropdown on hover) */}
          <NavLink to={item.path ?? "#"} aria-haspopup="true" aria-expanded={dropdownOpen}>
            <span className="flex items-center">
              {item.name}
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </NavLink>

          {/* Dropdown Menu */}
          <ul
            className={cn(`absolute left-0 mt-2 w-40 rounded border shadow-lg group-hover:block`, {
              hidden: !dropdownOpen,
              block: dropdownOpen,
              "border-black bg-black text-white": isHomePage || darkMode,
              "border-white bg-white text-black": !isHomePage && !darkMode,
            })}
            style={{ paddingTop: "10px", marginTop: "0px" }} // Ensure dropdown is positioned without affecting the title
          >
            {item.children &&
              Array.isArray(item.children) &&
              item.children.map((child) => (
                <li key={child.name} className={`p-2 ${isHomePage ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                  <NavLink to={child.path ?? "#"} onClick={() => setDropdownOpen(false)}>
                    {child.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <NavLink to={item.path ?? "#"}>{item.name}</NavLink>
      )}
    </li>
  );
};
