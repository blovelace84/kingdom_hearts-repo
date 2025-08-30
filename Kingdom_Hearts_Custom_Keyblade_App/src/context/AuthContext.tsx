import React, { createContext, useState, useEffect, useContext, ReactNode, Children } from "react";
import { Models } from "appwrite";
import { account } from "../services/appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null); 

    const login = async (email: string, password: string) => {
        await account.createEmailPasswordSession(email, password);
        const currentUser = await account.get();
        setUser(currentUser);
    };

    const register = async (email: string, password: string) => {
        await account.create("unique()", email, password);
        await login(email, password);
    };

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
    };

     const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
