import { apiFetch } from "@/shared/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { z } from "zod";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  id: string;
  username: string;
  title: string;
  bio: string;
  errorMessage: string;
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
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const checkSession = async () => {
    try {
      const user = await apiFetch(
        "/api/auth/session",
        { credentials: "include" },
        z.object({
          id: z.string(),
          username: z.string(),
          title: z.string(),
          bio: z.string(),
        }),
      );
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
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setErrorMessage(errMsg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        isAuthenticated,
        id,
        username,
        title,
        bio,
        login,
        logout,
        isLoading,
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
