"use client";
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType, User  } from './AuthContext';
import { auth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../lib/firebaseConfig';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    //條件渲染可逕用user為判斷依據  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    const register = async (email: string, password: string): Promise<User | null> => {
      console.log("嘗試註冊:", { email, password }); 
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid, email: userEmail } = userCredential.user;
        return { uid, email: userEmail }; 
      } catch (error) {
        console.error("註冊失敗:", error);
        throw error;  
      }
    };

    const signIn = async (email: string, password: string) : Promise<User | null>=> {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return null;
        // 登入成功後，onAuthStateChanged 被自動觸發，firebase執行對應操作
      } catch (error) {
        console.error("登入失敗:", error);
        throw error; 
      }
    };
  
    const logout = async () => {
      try {
        await signOut(auth);
        // 登出成功後，onAuthStateChanged 被自動觸發，firebase執行對應操作
      } catch (error) {
        console.error("登出失敗:", error);
        throw error; 
      }
    };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {         //firebaseUser物件,當前會員的所有欄位資料值
          console.log(firebaseUser); 
          const { uid, email } = firebaseUser;
          setUser({ uid, email });  //只更新會使用到的資料
        } else {
          setUser(null);           //身分驗證失敗(登出、過期etc)->更新為未被認證
        }
      });
  
      return () => unsubscribe();  //取消訂閱 監聽器，避追蹤 舊的驗證狀態
    }, []);
  
  
    return (
      <AuthContext.Provider value={{ user, register, signIn, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export const useAuth = () => useContext<AuthContextType>(AuthContext);
