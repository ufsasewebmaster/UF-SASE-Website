import { Link } from "@tanstack/react-router";
import React from "react";
import { FiUser } from "react-icons/fi";

interface UserButtonProps {
  isLoggedIn: boolean;
}

export const UserButton: React.FC<UserButtonProps> = ({ isLoggedIn }) =>
  isLoggedIn ? (
    <Link to="/profile">
      <button className="transform rounded-full px-1 py-2 text-gray-600 duration-300 hover:scale-105 hover:text-[#000000]">
        <FiUser className="text-2xl" />
      </button>
    </Link>
  ) : (
    <Link to="/login">
      <button className="inline-block transform rounded-full bg-[#0f6cb6] px-5 py-2 text-white duration-300 hover:scale-105 hover:bg-[#8dc63f] hover:text-[#000000]">
        Log In
      </button>
    </Link>
  );
