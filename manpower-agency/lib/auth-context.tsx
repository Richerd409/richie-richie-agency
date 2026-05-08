import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "worker" | "supervisor" | "client" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, otp: string, role: UserRole) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session on app startup
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, otp: string, role: UserRole) => {
    try {
      // TODO: Call API to verify OTP and get user data
      // For now, create a mock user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split("@")[0],
        email,
        phone: "",
        role,
        profileComplete: false,
      };

      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: Partial<User>) => {
    try {
      // TODO: Call API to register user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "worker",
        profileComplete: false,
      };

      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in");

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
