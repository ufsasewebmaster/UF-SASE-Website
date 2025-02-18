import { Link } from "@tanstack/react-router";
import React from "react";

interface UserButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const UserButton: React.FC<UserButtonProps> = ({ isLoggedIn, onLogout }) =>
  isLoggedIn ? (
    <Link to="/profile">
      <button className="transform rounded-full text-gray-600 duration-300 hover:scale-105 hover:text-[#000000]">
        <span className="icon-[qlementine-icons--user-16] h-8 w-8"></span>
      </button>
    </Link>
  ) : (
    <Link to="/login">
      <button
        className="inline-block transform rounded-full border-2 border-white bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black"
        onClick={onLogout}
      >
        Login
      </button>
    </Link>
  );
