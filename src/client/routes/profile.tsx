import { DarkModeContext } from "@components/DarkModeProvider";
import AccountBox from "@components/profile/AccountBox";
import ProfileNav from "@components/profile/ProfileNav";
import SecurityBox from "@components/profile/SecurityBox";
import SettingsBox from "@components/profile/SettingsBox";
import UserInfoBox from "@components/profile/UserInfoBox";
import { useAuth } from "@hooks/AuthContext";
import { useProfile } from "@hooks/useProfile";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/profile")({
  meta: () => [
    ...seo({
      title: "Profile | UF SASE",
      description: "Profile page for usser information, must be logged in to UF SASE account view.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const { data: profile, error, isLoading } = useProfile();
    const [activeSection, setActiveSection] = useState<string>("account");
    const { errorMessage, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    if (!isAuthenticated) {
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
      return <div>Not authenticated, redirecting to login page</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleLogout = async () => {
      try {
        // Use a hook-based logout if possible; otherwise, fall back to fetch
        // const response = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        logout();
        navigate({ to: "/" });
      } catch (error) {
        console.error("");
        console.error("Logout error:", error);
      }
    };

    const updateComponent = (section: string) => {
      setActiveSection(section);
    };

    return (
      <div className="flex min-h-screen bg-gray-100 p-10">
        {errorMessage && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{errorMessage}</div>}
        <div className="flex items-start">
          <ProfileNav profileName={profile?.username} update={updateComponent} activeSection={activeSection} />
        </div>
        <div className="flex w-full flex-col items-center justify-between py-6">
          {activeSection === "account" ? (
            <AccountBox username={profile?.username || "User"} handleLogout={handleLogout} />
          ) : activeSection === "userinfo" ? (
            <UserInfoBox />
          ) : activeSection === "security" ? (
            <SecurityBox />
          ) : activeSection === "settings" ? (
            <SettingsBox darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          ) : (
            <div className="h-3/4 w-3/4 rounded-xl border border-black"></div>
          )}
        </div>
      </div>
    );
  },
});
