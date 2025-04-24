import { UserForm } from "@client/components/UserForm";
// import { UserList } from "@client/components/UserList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/userpage")({
  component: () => {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">User Management</h1>
        <UserForm />
        {/* <UserList /> */}
      </div>
    );
  },
});
