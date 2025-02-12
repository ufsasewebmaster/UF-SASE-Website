import { Link } from "@tanstack/react-router";
import React from "react";

interface UserButtonProps {
  isLoggedIn: boolean;
}

export const UserButton: React.FC<UserButtonProps> = ({ isLoggedIn }) =>
  isLoggedIn ? (
    <Link to="/profile">
      <button className="transform rounded-full text-gray-600 duration-300 hover:scale-105 hover:text-[#000000]">
        <span className="icon-[qlementine-icons--user-16] h-8 w-8"></span>
      </button>
    </Link>
  ) : (
    <Link to="/login">
      <button className="md:text-md min-w-20 transform rounded-full bg-[#0f6cb6] px-2 py-2 text-sm text-white duration-300 hover:scale-105 hover:bg-[#8dc63f] hover:text-[#000000] md:px-5">
        Log In
      </button>
    </Link>
  );
