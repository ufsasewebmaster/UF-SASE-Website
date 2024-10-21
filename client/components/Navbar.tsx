// src/components/Navbar/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import {Logo} from "@client/components/navigation/Logo";
import {DesktopMenu} from "client/components/navigation/DesktopMenu";
import {MobileMenu} from "client/components/navigation/MobileMenu";
import {SearchBar} from "client/components/navigation/SearchBar";
import {UserButton} from "client/components/navigation/UserButton";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "User Page", path: "/UserPage" },
  { name: "Todo Page", path: "/TodoPage" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <header className="bg-white font-[Poppins] font-medium shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-8 py-3 h-16 relative">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center w-full">
          <DesktopMenu navItems={navItems} />
          <div className="flex items-center gap-4">
            <SearchBar />
            <UserButton isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <SearchBar className="w-32 focus:w-64" />
          <UserButton isLoggedIn={isLoggedIn} />
          <button ref={hamburgerRef} className="focus:outline-none">
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} color="#000" size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu navItems={navItems} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
