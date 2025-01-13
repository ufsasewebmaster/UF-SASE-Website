import { useUsers } from "@hooks/useUsers"; // Use the top-level abstraction
import { createFileRoute } from "@tanstack/react-router";

// Profile route component
export const Route = createFileRoute("/profile")({
  component: () => {
    const userId = "current_user"; // Replace with actual logic to fetch current user ID

    // Call the useUsers hook here
    const { user: userQuery } = useUsers(userId);

    // Call the overall query. While this is tied to all of the users functions, it will NOT incur additional overhead,
    // as it caches and only does calls that are used int his code
    const { data: profile, error, isError, isLoading } = userQuery;

    // Handle loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Handle error state
    if (isError) {
      return <div>Error fetching profile: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }

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
