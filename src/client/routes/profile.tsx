import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  component: () => {
    const [profile, setProfile] = useState<{ username: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/profile", { credentials: "include" });

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    //just temporary UI for now
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="text-4xl font-bold">{profile?.username?.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-semibold">Welcome, {profile?.username}!</h2>
          </div>
        </div>
      </div>
    );
  },
});
