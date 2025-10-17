import { refreshToken as refreshService } from "@/services/authService";
import { clearTokens, getTokens, saveTokens } from "@/utils/secureStore";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  loading: boolean;
  handleLogin: (accessToken: string, refreshToken: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    const { accessToken, refreshToken } = await getTokens();
    if (!accessToken || !refreshToken) {
      setLoading(false);
      return;
    }

    try {
      setUser({});
    } catch (err) {
      await handleRefreshToken(refreshToken);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(accessToken: string, refreshToken: string) {
    await saveTokens(accessToken, refreshToken);
    setUser({});
  }

  async function handleLogout() {
    await clearTokens();
    setUser(null);
  }

  async function handleRefreshToken(token: string) {
    try {
      const { accessToken, refreshToken } = await refreshService(token);
      await saveTokens(accessToken, refreshToken);
      setUser({});
    } catch {
      await clearTokens();
      setUser(null);
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
