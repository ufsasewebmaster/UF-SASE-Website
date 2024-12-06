import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// Function to fetch the username from the server
const fetchUserProfile = async (): Promise<{ username: string | null }> => {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    return { username: data.username || null };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { username: null };
  }
};

export const Route = createFileRoute("/profile")({
  component: () => {
    const [profile, setProfile] = useState<{ username: string | null }>({ username: null });

    useEffect(() => {
      const fetchData = async () => {
        const fetchedProfile = await fetchUserProfile();
        setProfile(fetchedProfile); // Set the profile state with the fetched data
      };

      fetchData();
    }, []);

    if (profile.username === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="text-4xl font-bold">{profile.username?.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-semibold">Welcome, {profile.username}!</h2>
          </div>
        </div>
      </div>
    );
  },
});
