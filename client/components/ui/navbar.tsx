import { Link } from "@tanstack/react-router";
import { Squash as Hamburger } from "hamburger-react";
import React, { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="bg-white font-[Poppins] font-medium">
      <nav className="z-50 flex h-16 w-full items-center justify-between px-4 py-3 md:px-8">
        <div className="z-40">
          <Link to="/">
            <img
              className="w-40 transform cursor-pointer transition duration-300 hover:scale-105 md:w-44"
              src="./client/assets/images/SASELogo.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation Buttons! */}
        <div className="hidden w-full items-center md:flex">
          <ul className="mr-auto flex items-center gap-[3vw] px-10 pt-1 md:flex-row">
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
              >
                Board
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
              >
                Blogs
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-32 rounded-full border border-gray-600 py-2 pl-10 pr-3 placeholder-gray-600 transition-all duration-300 ease-in-out focus:w-64 focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3 h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-4l4 4"
                />
              </svg>
            </div>
            {isLoggedIn ? (
              <Link to="/">
                <button className="transform rounded-full px-1 py-2 text-gray-600 duration-300 hover:scale-105 hover:text-[#000000]">
                  <FiUser className="text-2xl" />
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="inline-block transform rounded-full bg-[#0f6cb6] px-5 py-2 text-white duration-300 hover:scale-105 hover:bg-[#8dc63f] hover:text-[#000000]">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <div
          ref={menuRef}
          className={`nav-links absolute w-full bg-white transition-all duration-500 ease-in-out md:hidden ${
            menuOpen ? "top-[65px]" : "top-[-100%]"
          }`}
        >
          <ul className="flex flex-col items-end gap-8 py-4 pr-12">
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
                onClick={() => setMenuOpen(false)}
              >
                Board
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block transform duration-300 hover:scale-105 hover:text-[#0f6cb6]"
                onClick={() => setMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-32 rounded-full border border-gray-600 py-2 pl-10 pr-3 placeholder-gray-600 transition-all duration-300 ease-in-out focus:w-64 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-4l4 4"
              />
            </svg>
          </div>

          {isLoggedIn ? (
            <Link to="/">
              <button className="transform rounded-full px-1 py-2 text-gray-600 duration-300 hover:scale-105 hover:text-[#000000]">
                <FiUser className="text-2xl" />
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button className="inline-block transform rounded-full bg-[#0f6cb6] px-5 py-2 text-white duration-300 hover:scale-105 hover:bg-[#8dc63f] hover:text-[#000000]">
                Log In
              </button>
            </Link>
          )}
          <button ref={hamburgerRef} className="focus:outline-none">
            <Hamburger
              toggled={menuOpen}
              toggle={setMenuOpen}
              color="#000"
              size={22}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
