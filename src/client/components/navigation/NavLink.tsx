import { Link } from "@tanstack/react-router";
import React from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, onClick, to }) => (
  <Link
    to={to}
    className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
    onClick={onClick}
  >
    {children}
  </Link>
);
