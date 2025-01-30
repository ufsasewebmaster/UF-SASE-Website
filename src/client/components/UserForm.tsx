// src/components/UserForm.tsx
import { Button } from "@client/components/ui/button";
import { Input } from "@client/components/ui/input";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const UserForm = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    points: 0,
    roles: "user",
  });

  // TODO: Get id from user context
  const { createUser } = useUsers("default");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.username.trim().length === 0 || newUser.password.trim().length === 0) return;
    createUser.mutate(newUser, {
      onSuccess: () => {
        setNewUser({
          username: "",
          password: "",
          points: 0,
          roles: "user",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
      <Input
        type="text"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        placeholder="Username"
        className="mb-2 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Input
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        placeholder="Password"
        className="mb-2 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Input
        type="number"
        value={newUser.points}
        onChange={(e) => setNewUser({ ...newUser, points: parseInt(e.target.value) })}
        placeholder="Points"
        className="mb-2 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Input
        type="text"
        value={newUser.roles}
        onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
        placeholder="Roles"
        className="mb-2 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button type="submit" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
        Add User
      </Button>
    </form>
  );
};
