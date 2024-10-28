import React, { useState } from "react";
import { NavLink } from "./NavLink";

interface NavItem {
  name: string;
  path?: string;
  children?: Array<NavItem>;
}

export const DesktopMenu: React.FC<{ navItems: Array<NavItem> }> = ({
  navItems,
}) => {
  return (
    <ul className="flex space-x-6">
      {navItems.map((item) => (
        <NavItemComponent key={item.name} item={item} />
      ))}
    </ul>
  );
};

const NavItemComponent: React.FC<{ item: NavItem }> = ({ item }) => {
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
          <NavLink
            to={item.path!}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span>{item.name}</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </NavLink>

          {/* Dropdown Menu */}
          <ul
            className={`absolute left-0 mt-2 w-40 rounded border bg-white shadow-lg group-hover:block ${dropdownOpen ? "block" : "hidden"}`}
            style={{ paddingTop: "10px", marginTop: "0px" }} // Ensure dropdown is positioned without affecting the title
          >
            {item.children!.map((child) => (
              <li key={child.name} className="p-2 hover:bg-gray-200">
                <NavLink
                  to={child.path!}
                  onClick={() => setDropdownOpen(false)}
                >
                  {child.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NavLink to={item.path!}>{item.name}</NavLink>
      )}
    </li>
  );
};
