import React from "react";
import { Link } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, onClick, to }) => (
  <Link
    to={to}
    className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
    onClick={onClick}
  >
    {children}
  </Link>
);

