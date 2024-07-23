"use client";
import { useContext } from "react";
import { AuthContext } from '../store/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth 需使用於AuthProvider內部");
    }

    return useContext(AuthContext);
};
  
export default useAuth;
