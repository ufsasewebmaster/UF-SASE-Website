// src/routes/UsersPage.tsx
import { UserForm } from "@client/components/UserForm";
import { UserList } from "@client/components/UserList";

const UsersPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default UsersPage;
