import { insertUserSchema, selectUserSchema } from "@/shared/userSchema";

import type { InsertUser, SelectUser, UpdateUser } from "@/shared/userSchema";


// Fetch ALL Users
export const fetchUsers = async (): Promise<Array<SelectUser>> => {
  const response = await fetch("/api/users");
  const users = await response.json();
  return selectUserSchema.array().parse(users); // Validate as an array of SelectUser
};

export const createUser = async (newUser: InsertUser): Promise<SelectUser> => {
  // Validate input here
  insertUserSchema.parse(newUser);
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  // Validate output as step before returning
  const createdUser = await response.json();
  return selectUserSchema.parse(createdUser);
};

export const updateUser = async (updatedUser: UpdateUser): Promise<SelectUser> => {
  insertUserSchema.parse(updatedUser);
  const response = await fetch(`/api/users/${updatedUser.id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUserData = await response.json();
  return selectUserSchema.parse(updatedUserData);
};

export const deleteUser = async (userId: number): Promise<{ success: boolean }> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return { success: true };
};
