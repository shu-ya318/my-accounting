"use client";
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthError
} from 'firebase/auth'
import { User, UserCredential } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig'

interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: CustomUser | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async (email: string, password: string) => {
    throw new Error("register function not implemented");
  },
  signin: async (email: string, password: string) => {
    throw new Error("signin function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
});


export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // 避初次開啟頁面，onAuthStateChanged事件未觸發or未返回資料，致永遠加載中
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading])

  const register = async (email: string, password: string) => {
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const e = error as AuthError;
      throw new Error(e.message);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const e = error as AuthError;
      throw new Error(e.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      const e = error as AuthError;
      throw new Error(e.message);
    }
  };


  return (
    <AuthContext.Provider value={{ user, register, signin, logout }}>
      {loading ? <div>加載中...</div> : children}
    </AuthContext.Provider>
  );
}