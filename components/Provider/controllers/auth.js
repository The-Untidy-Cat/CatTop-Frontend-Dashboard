import { api } from "@/utils/axios";
import { notification } from "antd";
import { useEffect, useState } from "react";

export const useAuthController = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const login = async (account) => {
    try {
      const response = await api.post("/auth/dash", account);
      setUser(response?.data?.data?.user);
    } catch (error) {
      throw error;
    }
    return;
  };

  const logout = async () => {
    setLoadingAuth(true);
    try {
    await api.delete("/auth/logout");
      setUser(null);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
  };

  const getUser = async () => {
    setLoadingAuth(true);
    try {
      const response = await api.get("/dashboard/user");
      setUser(response?.data?.data?.user);
    } catch (error) {
      // notification.error({
      //   message: "Error",
      //   description: error?.message || "Something went wrong",
      // });
    }
    setLoadingAuth(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    loadingAuth,
    login,
    logout,
    getUser
  };
};

export const useFakeAuthController = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const login = async (account) => {
    setLoadingAuth(true);
    try {
      if (account.username !== "admin" || account.password !== "admin") {
        throw new Error("Invalid credentials");
      }
      setUser({
        name: "Administrator",
        role: "admin",
      });
      notification.success({
        message: "Success",
        description: "Login successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
        duration: 30000,
      });
    }
    setLoadingAuth(false);
  };

  const logout = async () => {
    setLoadingAuth(true);
    try {
      // Logout logic here
      setUser(null);
      notification.success({
        message: "Success",
        description: "Logout successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
  };

  return {
    user,
    loadingAuth,
    login,
    logout,
  };
};
