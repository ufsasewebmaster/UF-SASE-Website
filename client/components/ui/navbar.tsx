import React, { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="bg-white font-[Poppins] font-medium">
      <nav className="flex justify-start items-center w-[95%] mx-8 my-3">
        <div>
          <Link to="/">
            <img
              className="w-80 cursor-pointer transform hover:scale-105 inline-block duration-300"
              src="./client/assets/images/SASELogo.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div
          className={`nav-links md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            menuOpen ? "w-full top-[8%] justify-end px-7 py-3" : "w-full top-[-100%] justify-end"
          } flex px-4 duration-300`}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                Board
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#0f6cb6] duration-300 transform hover:scale-105 inline-block" onClick={() => setMenuOpen(false)}>
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full flex items-center justify-end gap-4 ml-auto pr-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 pl-10 pr-3 py-2 rounded-full focus:outline-none transition-all duration-300 ease-in-out w-32 focus:w-64"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
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

          <button className="bg-[#0f6cb6] text-white px-5 py-2 rounded-full hover:bg-[#8dc63f] hover:text-[#000000] duration-300 transform hover:scale-105 inline-block">
            Log In
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 menu-btn">
            {menuOpen ? (
              <IoMdClose className="text-3xl cursor-pointer" />
            ) : (
              <IoMdMenu className="text-3xl cursor-pointer" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
