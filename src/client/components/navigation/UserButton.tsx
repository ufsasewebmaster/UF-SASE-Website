import { useAuth } from "@hooks/AuthContext";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";

interface UserButtonProps {
  isHomePage: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const UserButton: React.FC<UserButtonProps> = ({ isHomePage, isLoggedIn, onLogout }) => {
  const { bio, logout, title, username } = useAuth();
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const isDropdownVisible = isHoveringButton || isHoveringCard;

  return (
    <div className="relative z-50">
      {isLoggedIn ? (
        <>
          {/* Profile Icon Button */}
          <Link to="/profile">
            <button
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setTimeout(() => setIsHoveringButton(false), 100)}
              className={`transform rounded-full ${isHomePage ? "text-white" : "text-foreground"} duration-300 hover:scale-105`}
            >
              <span className="icon-[qlementine-icons--user-16] h-8 w-8" />
            </button>
          </Link>

          {/* Dropdown Card */}
          <div
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setTimeout(() => setIsHoveringCard(false), 100)}
            className={`absolute right-0 mt-2 w-[420px] transform rounded-2xl bg-background px-6 py-5 shadow-xl shadow-foreground/30 transition-all duration-200 ease-in-out ${isDropdownVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} `.trim()}
          >
            <div className="flex items-start justify-between">
              {/* Avatar + Text */}
              <div className="flex gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-saseBlueLight">
                  <span className="icon-[qlementine-icons--user-16] h-12 w-12 text-white" />
                </div>
                <div className="text-sm text-foreground">
                  <p className="text-xl font-bold">{username || "[NAME]"}</p>
                  <p className="italic text-muted-foreground">{title || "ex: SASE President"}</p>
                  <p className="text-muted-foreground">Bio: {bio || "[Short sentence]"}</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  onLogout();
                }}
                className="text-sm font-semibold text-foreground transition-transform duration-200 ease-in-out hover:scale-105 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        // When not logged in, show the login button
        <Link to="/login">
          <button
            className={`inline-block transform rounded-full border-2 ${isHomePage ? "border-white" : "border-black"} whitespace-nowrap bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black`}
            onClick={onLogout}
          >
            Log In
          </button>
        </Link>
      )}
    </div>
  );
};
