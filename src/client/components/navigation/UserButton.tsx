import { useAuth } from "@hooks/AuthContext";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";

interface UserButtonProps {
  isLoggedIn: boolean;
  isHomePage: boolean;
  onLogout: () => void;
}

export const UserButton: React.FC<UserButtonProps> = ({ isHomePage, isLoggedIn, onLogout }) => {
  const { bio, id, logout, title, username } = useAuth();
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const isDropdownVisible = isHoveringButton || isHoveringCard;

  return (
    <div className="relative z-50">
      {isLoggedIn ? (
        <>
          {/* Profile Icon Button */}
          <button
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setTimeout(() => setIsHoveringButton(false), 100)}
            className={`transform rounded-full ${isHomePage ? "text-white" : "text-black"} duration-300 hover:scale-105`}
          >
            <span className="icon-[qlementine-icons--user-16] h-8 w-8" />
          </button>

          {/* Dropdown Card */}
          {isDropdownVisible && (
            <div
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setTimeout(() => setIsHoveringCard(false), 100)}
              className="absolute right-0 mt-2 w-[420px] rounded-2xl bg-white px-6 py-5 shadow-xl"
            >
              <div className="flex items-start justify-between">
                {/* Avatar + Text */}
                <div className="flex gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-saseBlueLight">
                    <span className="icon-[qlementine-icons--user-16] h-12 w-12 text-white" />
                  </div>
                  <div className="text-sm text-black">
                    <p className="text-xl font-bold">{username || "[NAME]"}</p>
                    <p className="text-base">UFID: {id || "[UFID]"}</p>
                    <p className="italic text-slate-500">{title || "ex: SASE President"}</p>
                    <p className="text-slate-600">Bio: {bio || "[Short sentence]"}</p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    onLogout();
                  }}
                  className="text-sm font-semibold text-black hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link to="/login">
          <button
            className={`transform rounded-full border-2 ${
              isHomePage ? "border-white" : "border-black"
            } whitespace-nowrap bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black`}
          >
            Log In
          </button>
        </Link>
      )}
    </div>
  );
};
