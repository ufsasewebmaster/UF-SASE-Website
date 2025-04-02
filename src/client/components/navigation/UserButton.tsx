import { useAuth } from "@hooks/AuthContext";
import { Link } from "@tanstack/react-router";
import React from "react";

interface UserButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  isHomePage: boolean;
}

export const UserButton: React.FC<UserButtonProps> = ({ isHomePage, isLoggedIn }) => {
  const { id, logout, username } = useAuth();

  const UserDropdown = () => (
    <div className="absolute right-0 z-50 mt-2 hidden w-96 rounded-2xl border bg-white p-4 shadow-xl group-hover:block">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-saseBlueLight text-4xl text-white">
            <span className="icon-[qlementine-icons--user-16] h-10 w-10" />
          </div>
          <div className="text-sm text-black">
            <p className="text-lg font-bold">{username || "[NAME]"}</p>
            <p>UFID: {id || "[UFID]"}</p>
            <p className="italic text-gray-500">ex: SASE President</p>
            <p className="text-gray-600">Bio: [Short sentence]</p>
          </div>
        </div>

        {/* Profile Link */}
        <Link to="/profile" className="text-sm text-saseBlue hover:underline">
          View Profile
        </Link>

        {/* Logout */}
        <button onClick={logout} className="self-start text-sm font-semibold text-black hover:text-red-600">
          Logout
        </button>
      </div>
    </div>
  );

  return isLoggedIn ? (
    <div className="group relative">
      {/* Profile Icon */}
      <button className={`transform rounded-full ${isHomePage ? "text-white" : "text-black"} duration-300 hover:scale-105 hover:text-[#000000]`}>
        <span className="icon-[qlementine-icons--user-16] h-8 w-8" />
      </button>

      {/* Dropdown */}
      <UserDropdown />
    </div>
  ) : (
    <Link to="/login">
      <button
        className={`inline-block transform rounded-full border-2 ${
          isHomePage ? "border-white" : "border-black"
        } whitespace-nowrap bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black`}
      >
        Log In
      </button>
    </Link>
  );
};
