'use client';
import {AuthContextProvider } from './store/AuthContext'; 

export default function ParentProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}