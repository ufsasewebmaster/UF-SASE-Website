import type { ApiResponse } from "@shared/schema/responseSchema";
import type { DeleteUser, InsertUser, SelectUser, UpdateUser } from "@shared/schema/userSchema";
import { insertUserSchema, selectUserSchema } from "@shared/schema/userSchema";

// Fetch ALL Users
export const fetchUsers = async (): Promise<Array<SelectUser>> => {
  const response = await fetch("/api/users");
  const json = (await response.json()) as ApiResponse<Array<SelectUser>>;

  if (!response.ok) {
    throw new Error(json.error?.message || "Unknown error occured");
  }

  return selectUserSchema.array().parse(json);
};

export const fetchUser = async (id: string): Promise<SelectUser> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "GET",
    credentials: "include", // Include session credentials (cookies)
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = (await response.json()) as ApiResponse<SelectUser>;

  if (!response.ok) {
    throw new Error(json.error?.message || "Unknown error occurred");
  }

  return selectUserSchema.parse(json.data);
};

export const createUser = async (newUser: InsertUser): Promise<SelectUser> => {
  insertUserSchema.parse(newUser);
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = (await response.json()) as ApiResponse<SelectUser>;

  if (!response.ok) {
    throw new Error(json.error?.message || "Unknown error occured");
  }

  return selectUserSchema.parse(json);
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
  const json = (await response.json()) as ApiResponse<SelectUser>;

  if (!response.ok) {
    throw new Error(json.error?.message || "Unknown error occured");
  }

  return selectUserSchema.parse(json);
};

export const deleteUser = async (userId: number): Promise<DeleteUser> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = (await response.json()) as ApiResponse<DeleteUser>;

  if (!response.ok) {
    throw new Error(json.error?.message || "Unknown error occured");
  }
  return { success: true };
};
