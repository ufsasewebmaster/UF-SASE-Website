import { Link } from "@tanstack/react-router";
import React from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, className, onClick, to }) => (
  <Link to={to} onClick={onClick} className={`inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6] ${className ?? ""}`}>
    {children}
  </Link>
);
