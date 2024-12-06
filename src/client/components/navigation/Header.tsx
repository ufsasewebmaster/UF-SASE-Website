import { cn } from "@/shared/utils";
import { DesktopMenu } from "@navigation/DesktopMenu";
import { Logo } from "@navigation/Logo";
import { MobileMenu } from "@navigation/MobileMenu";
import { SearchBar } from "@navigation/SearchBar";
import { UserButton } from "@navigation/UserButton";
import { useLocation } from "@tanstack/react-router";
import { Squash as Hamburger } from "hamburger-react";
import { useAuth } from "@/client/AuthContext";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    children: [
      { name: "Board", path: "/board" },
      { name: "Sponsors", path: "/sponsors" },
    ],
  },
  {
    name: "Events",
    path: "/events",
    children: [
      { name: "Gallery", path: "/gallery" },
      { name: "Blogs", path: "/blogs" },
    ],
  },
  {
    name: "Programs",
    path: "/programs",
    children: [
      { name: "Interns", path: "/interns" },
      { name: "SET", path: "/set" },
      { name: "Web Dev", path: "/webdev" },
      { name: "Sports", path: "/sports" },
    ],
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(`sticky left-0 top-0 z-50 w-full font-poppins font-medium shadow-md`, {
        "bg-black text-white": isHomePage,
        "bg-white text-black": !isHomePage,
      })}
    >
      <nav className="relative flex h-16 w-full items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="ml-auto flex items-center gap-4">
            <DesktopMenu navItems={navItems} isHomePage={isHomePage} />
            <SearchBar />
            <UserButton isLoggedIn={isAuthenticated} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <SearchBar className="w-32 focus:w-64" />
          <UserButton isLoggedIn={isAuthenticated} />
          <button ref={hamburgerRef} className="focus:outline-none">
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} color={isHomePage ? "#fff" : "#000"} size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu navItems={navItems} isOpen={menuOpen} onClose={() => setMenuOpen(false)} isHomePage={isHomePage} />
      </nav>
    </header>
  );
};

export default Header;
