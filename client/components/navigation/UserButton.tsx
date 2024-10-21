import React from "react";
import { Link } from "@tanstack/react-router";
import { FiUser } from "react-icons/fi";

interface UserButtonProps {
  isLoggedIn: boolean;
}

export const UserButton: React.FC<UserButtonProps> = ({ isLoggedIn }) => (
  isLoggedIn ? (
    <Link to="/Profile">
      <button className="text-gray-600 px-1 py-2 rounded-full duration-300 hover:text-[#000000] transform hover:scale-105">
        <FiUser className="text-2xl" />
      </button>
    </Link>
  ) : (
    <Link to="/login">
      <button className="bg-[#0f6cb6] text-white px-5 py-2 rounded-full hover:bg-[#8dc63f] hover:text-[#000000] duration-300 transform hover:scale-105 inline-block">
        Log In
      </button>
    </Link>
  )
);