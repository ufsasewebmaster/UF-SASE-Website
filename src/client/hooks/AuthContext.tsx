import { profileSchema } from "@/shared/schema/profileSchema";
import type { Profile } from "@/shared/schema/profileSchema";
import { apiFetch } from "@/shared/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  id: string;
  username: string;
  title?: string;
  bio?: string;
  errorMessage: string;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: async () => {},
  isLoading: true,
  id: "",
  username: "",
  title: "",
  bio: "",
  errorMessage: "",
  updateProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkSession = async () => {
    try {
      const user = await apiFetch("/api/auth/session", { credentials: "include" }, profileSchema);
      setId(user.data.id);
      setUsername(user.data.username);
      setTitle(user.data.title);
      setBio(user.data.bio);
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

  const login = () => {
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
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(errMsg);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const updated = await apiFetch(
        "/api/profile",
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify(updates),
          headers: { "Content-Type": "application/json" },
        },
        profileSchema,
      );
      setUsername(updated.data.username);
      setTitle(updated.data.title);
      setBio(updated.data.bio);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        id,
        username,
        title,
        bio,
        errorMessage,
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
