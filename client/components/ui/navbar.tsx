import React, { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FiUser } from "react-icons/fi";
import { Squash as Hamburger } from 'hamburger-react';

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
      <nav className="z-50 flex justify-between items-center w-full px-4 md:px-8 py-3 h-16">
        <div className="z-40">
          <Link to="/">
            <img
              className="w-40 md:w-44 cursor-pointer transform hover:scale-105 transition duration-300"
              src="./client/assets/images/SASELogo.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation Buttons! */}
        <div className="hidden md:flex items-center w-full">
          <ul className="flex md:flex-row items-center gap-[3vw] mr-auto px-10 pt-1">
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                Board
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
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
                className="border border-gray-600 pl-10 pr-3 py-2 rounded-full focus:outline-none transition-all duration-300 ease-in-out w-32 focus:w-64 placeholder-gray-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3 h-5 w-5 text-gray-600 "
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
                <button className="text-gray-600 px-1 py-2 rounded-full duration-300 hover:text-[#000000] transform hover:scale-105">
                  <FiUser className="text-2xl" />
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="bg-[#0f6cb6] text-white px-5 py-2 rounded-full hover:bg-[#8dc63f] hover:text-[#000000] duration-300 transform hover:scale-105 inline-block">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <div
          ref={menuRef}
          className={`nav-links md:hidden absolute bg-white transition-all ease-in-out duration-500 w-full ${
            menuOpen ? "top-[65px]" : "top-[-100%]"
          }`}
        >
          <ul className="flex flex-col items-end gap-8 py-4 pr-12">
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                Board
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block"
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
              className="border border-gray-600 pl-10 pr-3 py-2 rounded-full focus:outline-none transition-all duration-300 ease-in-out w-32 focus:w-64 placeholder-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-5 w-5 text-gray-600 "
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
              <button className="text-gray-600 px-1 py-2 rounded-full duration-300 hover:text-[#000000] transform hover:scale-105">
                <FiUser className="text-2xl" />
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button className="bg-[#0f6cb6] text-white px-5 py-2 rounded-full hover:bg-[#8dc63f] hover:text-[#000000] duration-300 transform hover:scale-105 inline-block">
                Log In
              </button>
            </Link>
          )}
          <button ref={hamburgerRef} className="focus:outline-none">
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} color="#000" size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
