import { Link } from "@tanstack/react-router";
import React from "react";

interface UserButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  isHomePage: boolean; // Add the isHomePage prop
}

export const UserButton: React.FC<UserButtonProps> = ({ isHomePage, isLoggedIn, onLogout }) =>
  isLoggedIn ? (
    <Link to="/profile">
      <button className={`transform rounded-full ${isHomePage ? "text-white" : "text-foreground"} duration-300 hover:scale-105 hover:text-[#000000]`}>
        <span className="icon-[qlementine-icons--user-16] h-8 w-8"></span>
      </button>
    </Link>
  ) : (
    <Link to="/login">
      <button
        className={`inline-block transform rounded-full border-2 ${isHomePage ? "border-white" : "border-foreground"} whitespace-nowrap bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black`}
        onClick={onLogout}
      >
        Log In
      </button>
    </Link>
  );
