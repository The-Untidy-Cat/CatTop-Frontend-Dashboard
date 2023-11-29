import { api } from "@/utils/axios";
import { notification } from "antd";
import { useState } from "react";

export const useAuthController = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const login = async (account) => {
        setLoadingAuth(true);
        try {
            // Login logic here
            const data_admin = await api.post("/auth/dash", account);
            setUser(account);
            console.log(data_admin);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.message || 'Something went wrong'
            });
        }
        setLoadingAuth(false);
    }

    const logout = async () => {
        setLoadingAuth(true);
        try {
            // Logout logic here
            setUser(null);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.message || 'Something went wrong'
            });
        }
        setLoadingAuth(false);
    }

    return {
        user,
        loadingAuth,
        login,
        logout
    }
}

export const useFakeAuthController = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const login = async (account) => {
        setLoadingAuth(true);
        try {
            if (account.username !== 'admin' || account.password !== 'admin') {
                throw new Error('Invalid credentials');
            }
            setUser({
                name: 'Administrator',
                role: 'admin'
            });
            notification.success({
                message: 'Success',
                description: 'Login successfully'
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.message || 'Something went wrong',
                duration: 30000
            });
        }
        setLoadingAuth(false);
    }

    const logout = async () => {
        setLoadingAuth(true);
        try {
            // Logout logic here
            setUser(null);
            notification.success({
                message: 'Success',
                description: 'Logout successfully'
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.message || 'Something went wrong'
            });
        }
        setLoadingAuth(false);
    }

    return {
        user,
        loadingAuth,
        login,
        logout
    }
}