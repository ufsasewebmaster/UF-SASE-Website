import ProfileNav from "@components/profile/ProfileNav";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SecurityBox from "../components/profile/SecurityBox";
import UserInfoBox from "../components/profile/UserInfoBox";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/AuthContext";
import { useProfile } from "../hooks/useProfile";

export const Route = createFileRoute("/profile")({
  component: () => {
    const { data: profile, error, isLoading } = useProfile();
    const [activeSection, setActiveSection] = useState<string>("account");
    const { errorMessage, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

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
          {activeSection === "userinfo" ? (
            <UserInfoBox />
          ) : activeSection === "security" ? (
            <SecurityBox />
          ) : (
            <div className="h-3/4 w-3/4 rounded-xl border border-black"></div>
          )}
          <Button variant="destructive" className="mt-4" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    );
  },
});
