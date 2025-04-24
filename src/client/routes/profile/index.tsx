// src/routes/profile/index.tsx
import AccountBox from "@components/profile/AccountBox";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: () => {
    const { id } = useAuth();
    const { error, isLoading, user } = useUsers(id);

    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User data unavailable</div>;

    return (
      <AccountBox
        username={user.username}
        email={user.email}
        firstName={user.firstName ?? ""}
        lastName={user.lastName ?? ""}
        timeAdded={user.timeAdded}
        timeUpdated={user.timeUpdated}
        points={user.points ?? 0}
        roles={user.roles ?? ""}
      />
    );
  },
});
