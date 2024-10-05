// src/components/UserList.tsx
import { useUsers } from "../hooks/useUsers";
import { Button } from "@client/components/ui/button";
import type { UpdateUser } from "@/shared/userSchema";

export const UserList = () => {
  const { updateUser, users } = useUsers();

  // Handle loading state
  if (users.isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (users.isError) {
    return <p className="text-center text-red-500">Error fetching users</p>;
  }

  // Handle case when there are no users
  if (!users.data?.length) {
    return <p className="text-center text-muted-foreground">No users</p>;
  }

  return (
    <div className="space-y-2">
      {users.data?.map((user) => (
        <div key={user.id} className="flex items-center justify-between rounded-md bg-card p-2">
          <div className="flex items-center">
            <span className="text-card-foreground">
              {user.username} - {user.roles}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              updateUser.mutate({
                id: user.id,
                roles: user.roles === "admin" ? "user" : "admin",
              } as UpdateUser)
            }
            className="text-muted-foreground hover:bg-muted/50"
          >
            Toggle Role
          </Button>
        </div>
      ))}
    </div>
  );
};
