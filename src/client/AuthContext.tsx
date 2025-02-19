// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

// Create AuthContext as undefined values for now:
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}
// AuthProvider component that wraps your app and provides auth state
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); // userbutton wont render unless loading is false
    }
  };

  useEffect(() => {
    checkSession(); // validate user session whenever authcontext renders
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
