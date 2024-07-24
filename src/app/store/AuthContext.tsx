"use client";
import { createContext } from 'react';

export interface User {
  uid: string;
  email: string | null;
}

export  interface AuthContextType {
  user: User | null;
  register: (email: string, password: string) => Promise<User | null>; 
  signIn: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async (email: string, password: string) => {
    return null;
  },
  signIn: async (email: string, password: string) => { 
    return null;
  },
  logout: async () => {}
});