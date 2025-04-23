// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchSession, loginApi, logoutApi } from "../api/auth";

export interface AuthContextType {
  isAuthenticated: boolean;
  roles: Array<string>;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  id: string;
  errorMessage: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkSession = async () => {
    try {
      const user = await fetchSession();
      // console.log
      setId(user.id);
      setRoles(user.roles);
      setIsAuthenticated(true);
      setErrorMessage("");
    } catch (err: unknown) {
      setIsAuthenticated(false);
      setRoles([]);
      setErrorMessage("Unknown error occurred" + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await loginApi({ username, password });
      const user = await fetchSession();

      setId(user.id);
      setRoles(user.roles);
      setIsAuthenticated(true);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Unknown error" + err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
      setIsAuthenticated(false);
      setRoles([]);
      setId("");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Unknown error occurred" + err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = roles.includes("admin");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        isAdmin,
        login,
        logout,
        isLoading,
        id,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
