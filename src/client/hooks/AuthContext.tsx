import { apiFetch } from "@/shared/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { z } from "zod";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  id: string;
  errorMessage: string;
  title: string;
  username: string;
  bio: string;
  ufid: string;
  discord: string;
  roles: string;
  email: string;
  updateProfile: (
    data: Partial<{
      id: string;
      username: string;
      title: string;
      bio: string;
      ufid: string;
      discord: string;
      roles: string;
      email: string;
    }>,
  ) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  id: "",
  errorMessage: "",
  title: "",
  username: "",
  bio: "",
  ufid: "",
  discord: "",
  roles: "",
  email: "",
  updateProfile: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("Member");
  const [username, setUsername] = useState<string>("User");
  const [bio, setBio] = useState<string>("This is a short user bio.");
  const [ufid, setUfid] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const checkSession = async () => {
    try {
      const user = await apiFetch(
        "/api/auth/session",
        { credentials: "include" },
        z.object({
          id: z.string(),
          username: z.string(),
          title: z.string().optional(),
          bio: z.string().optional(),
          ufid: z.string().optional(),
          discord: z.string().optional(),
          roles: z.string().optional(),
          email: z.string().optional(),
        }),
      );
      setId(user.data.id);
      setUsername(user.data.username);
      setTitle(user.data.title ?? "Member");
      setBio(user.data.bio ?? "This is a short user bio.");
      setUfid(user.data.ufid ?? "");
      setDiscord(user.data.discord ?? "");
      setRoles(user.data.roles ?? "");
      setEmail(user.data.email ?? "");
      setIsAuthenticated(true);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(errMsg);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async () => {
    await checkSession();
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        setId("");
        setUsername("");
        setTitle("");
        setBio("");
        setUfid("");
        setDiscord("");
        setRoles("");
        setEmail("");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(errMsg);
    }
  };

  // New updateProfile function to update AuthContext state after changes.
  const updateProfile = (
    data: Partial<{
      id: string;
      username: string;
      title: string;
      bio: string;
      ufid: string;
      discord: string;
      roles: string;
      email: string;
    }>,
  ) => {
    if (data.id !== undefined) setId(data.id);
    if (data.username !== undefined) setUsername(data.username);
    if (data.title !== undefined) setTitle(data.title);
    if (data.bio !== undefined) setBio(data.bio);
    if (data.ufid !== undefined) setUfid(data.ufid);
    if (data.discord !== undefined) setDiscord(data.discord);
    if (data.roles !== undefined) setRoles(data.roles);
    if (data.email !== undefined) setEmail(data.email);
  };

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        isAuthenticated,
        id,
        login,
        logout,
        isLoading,
        title,
        username,
        bio,
        ufid,
        discord,
        roles,
        email,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
