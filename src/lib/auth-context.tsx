import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchMe, getToken, loginRequest, setToken, signupRequest, type AuthUser } from "@/lib/admin-api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (data: { name: string; email: string; password: string; organization?: string }) => Promise<AuthUser>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { user: me } = await fetchMe();
      setUser(me);
    } catch {
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        const result = await loginRequest(email, password);
        setToken(result.token);
        setUser(result.user);
        return result.user;
      },
      signup: async (data) => {
        const result = await signupRequest(data);
        setToken(result.token);
        setUser(result.user);
        return result.user;
      },
      logout: () => {
        setToken(null);
        setUser(null);
      },
      refresh,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
