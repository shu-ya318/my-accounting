"use client";
import { createContext } from 'react';

export interface User {
  uid: string;
  email: string | null;
}

export  interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>; 
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: async (email: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  logout: async () => {}
});