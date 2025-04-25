import type { DeleteUser, InsertUser, PublicUser, SelectUser, UpdateUser } from "@shared/schema/userSchema";
import { deleteUserSchema, insertUserSchema, publicUserSchema, selectUserSchema } from "@shared/schema/userSchema";
import { apiFetch } from "@shared/utils";

// Fetch ALL Users
export const fetchUsers = async (): Promise<Array<SelectUser>> => {
  const response = await apiFetch("/api/users", { method: "GET" }, selectUserSchema.array());
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

export const fetchPublicUser = async (username: string, id: string): Promise<PublicUser> => {
  const response = await apiFetch(
    `/api/users/public/${encodeURIComponent(username)}/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: "include",
    },
    publicUserSchema,
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
