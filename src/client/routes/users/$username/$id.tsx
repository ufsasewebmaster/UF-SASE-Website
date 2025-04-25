// src/routes/users/$username/$id.tsx
import { fetchPublicUser } from "@/client/api/users";
import type { PublicUser } from "@shared/schema/userSchema";
import { createFileRoute, useMatch, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/users/$username/$id")({
  component: PublicProfile,
});

function PublicProfile() {
  const {
    params: { id, username },
  } = useMatch({ from: "/users/$username/$id" });
  const navigate = useNavigate();

  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPublicUser(username, id)
      .then((u) => {
        setUser(u);
        // If the username in the URL is stale, redirect to the correct slug
        if (u.username !== username) {
          navigate({
            to: `/users/${u.username}/${u.id}`,
            replace: true,
          });
        }
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [username, id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg">Loading profile…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 py-8">
      <div className="group w-3/4 space-y-6 rounded-2xl bg-background px-10 py-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
            {user.firstName?.[0] ?? user.username[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName ?? ""} {user.lastName ?? ""}
            </h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Public Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>
            <div className="rounded-lg bg-gray-50 px-4 py-2 text-gray-800">{user.email}</div>
          </div>

          {/* Roles */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Roles</label>
            <div className="rounded-lg bg-gray-50 px-4 py-2 text-gray-800">{user.roles ?? "-"}</div>
          </div>

          {/* Points */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Points</label>
            <div className="rounded-lg bg-gray-50 px-4 py-2 text-gray-800">{user.points ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
