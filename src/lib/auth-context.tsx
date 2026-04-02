import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserRole } from "./constants";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("hopelink_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, _password: string, role: UserRole) => {
    const u: User = { id: crypto.randomUUID(), email, name: email.split("@")[0], role };
    setUser(u);
    localStorage.setItem("hopelink_user", JSON.stringify(u));
  }, []);

  const signup = useCallback((name: string, email: string, _password: string, role: UserRole) => {
    const u: User = { id: crypto.randomUUID(), email, name, role };
    setUser(u);
    localStorage.setItem("hopelink_user", JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("hopelink_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
