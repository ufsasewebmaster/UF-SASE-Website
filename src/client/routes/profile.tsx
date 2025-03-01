import ProfileNav from "@components/profile/ProfileNav";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import UserInfoBox from "../components/profile/UserInfoBox";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/profile")({
  component: () => {
    const [profile, setProfile] = useState<{ username: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState({
      account: true,
      userinfo: false,
      security: false,
      attendance: false,
      forms: false,
      resources: false,
      settings: false,
    });
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading) return;
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/profile", { credentials: "include" });
          if (!response.ok) {
            navigate({ to: "/" });
          }
          const result = (await response.json()) as { data: { username: string } };
          console.log("Profile API Response:", result);
          setProfile(result.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    }, []);

    const handleLogout = async () => {
      try {
        const response = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        if (response.ok) {
          logout();
          navigate({ to: "/" });
        } else {
          throw new Error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    const updateComponent = (section: string) => {
      setActiveSection({
        account: false,
        userinfo: false,
        security: false,
        attendance: false,
        forms: false,
        resources: false,
        settings: false,
      });

      setActiveSection((prev) => ({ ...prev, [section]: true }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="flex min-h-screen bg-gray-100 p-10">
        <div className="flex items-start">
          <ProfileNav profileName={profile?.username} update={updateComponent} />
        </div>
        <div className="flex w-full flex-col items-center justify-between py-6">
          {activeSection.userinfo ? <UserInfoBox /> : <div className="h-3/4 w-3/4 rounded-xl border border-black"></div>}

          {/* <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-white">
                <span className="text-4xl font-bold">{profile?.username?.charAt(0).toUpperCase()}</span>
              </div>
          <h2 className="text-xl font-semibold">Welcome, {profile?.username}!</h2>
            </div>
          </div> */}
          <Button variant="destructive" className="mt-4" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    );
  },
});
