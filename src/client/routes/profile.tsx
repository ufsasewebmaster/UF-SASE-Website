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
    console.log(response)
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
        setProfile(fetchedProfile);  // Set the profile state with the fetched data
      };

      fetchData();
    }, []);


    if (profile.username === null) {
      return <div>Loading...</div>; 
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold">
                {profile.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold">Welcome, {profile.username}!</h2>
          </div>
        </div>
      </div>
    );
  },
});

