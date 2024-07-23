"use client";
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType, User  } from './AuthContext';
import { auth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../lib/firebaseConfig';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    //條件渲染可逕用user為判斷依據  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  
    const register = async (email: string, password: string): Promise<void> => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("註冊失敗:", error);
      }
    };

    const signIn = async (email: string, password: string) : Promise<void>=> {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // 登入成功後，onAuthStateChanged 被自動觸發，firebase執行對應操作
      } catch (error) {
        console.error("登入失敗:", error);
      }
    };
  
    const logout = async () => {
      try {
        await signOut(auth);
        // 登出成功後，onAuthStateChanged 被自動觸發，firebase執行對應操作
      } catch (error) {
        console.error("登出失敗:", error);
      }
    };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {         //firebaseUser物件,當前會員的所有欄位資料值
          const { uid, email } = firebaseUser;
          setUser({ uid, email });  //只處理使用到資料
        } else {
          setUser(null);           //身分驗證失敗(登出、過期etc)->更新為未被認證
        }
        setLoading(false);
      });
  
      return () => unsubscribe();  //取消訂閱 監聽器，避追蹤 舊的驗證狀態
    }, []);
  
  
    return (
      <AuthContext.Provider value={{ user, loading, register, signIn, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export const useAuth = () => useContext<AuthContextType>(AuthContext);
