// src/routes/profile/route.tsx
import { imageUrls } from "@assets/imageUrls";
import { seo } from "@client/utils/seo";
import ProfileNav from "@components/profile/ProfileNav";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  meta: () => [
    ...seo({
      title: "Profile | UF SASE",
      description: "Profile page for user information, must be logged in to UF SASE account view.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const { errorMessage, id, isAuthenticated } = useAuth();
    const { error, isLoading, user } = useUsers(id);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>("account");

    if (!isAuthenticated) {
      setTimeout(() => navigate({ to: "/login" }), 2000);
      return <div>Not authenticated, redirecting to login page…</div>;
    }
    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User data unavailable</div>;

    const updateComponent = (section: string) => {
      setActiveSection(section);
    };

    return (
      <div className="flex min-h-screen bg-muted p-10">
        {errorMessage && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{errorMessage}</div>}
        <div className="flex items-start">
          <ProfileNav profileName={user.username} update={updateComponent} activeSection={activeSection} />
        </div>
        <div className="flex w-full flex-col items-center justify-between py-6">
          <Outlet />
        </div>
      </div>
    );
  },
});
