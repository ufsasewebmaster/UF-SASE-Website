import type { DeleteUser, InsertUser, SelectUser, UpdateUser } from "@shared/schema/userSchema";
import { deleteUserSchema, insertUserSchema, minimalUserSchema, selectUserSchema } from "@shared/schema/userSchema";
import { apiFetch } from "@shared/utils";

// Fetch ALL Users
export const fetchUsers = async (): Promise<Array<SelectUser>> => {
  const response = await apiFetch("/api/users", { method: "GET" }, minimalUserSchema.array());
  return response.data;
};

export const fetchUser = async (id: string): Promise<SelectUser> => {
  const response = await apiFetch(
    `/api/users/${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
    selectUserSchema,
  );
  return response.data;
};

export const createUser = async (newUser: InsertUser): Promise<SelectUser> => {
  insertUserSchema.parse(newUser);
  const response = await apiFetch(
    "/api/users",
    {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    },
    selectUserSchema,
  );
  return response.data;
};

export const updateUser = async (updatedUser: UpdateUser): Promise<SelectUser> => {
  insertUserSchema.parse(updatedUser);
  const response = await apiFetch(
    `/api/users/${updatedUser.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    },
    selectUserSchema,
  );
  return response.data;
};

export const deleteUser = async (userId: number): Promise<DeleteUser> => {
  const response = await apiFetch(
    `/api/users/${userId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
    deleteUserSchema,
  );
  return response.data;
};
