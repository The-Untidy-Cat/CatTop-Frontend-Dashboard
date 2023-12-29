import { api } from "@/utils/axios";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUserController = () => {
  const router = useRouter();
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

  const changePassword = async (account) => {
    setLoadingAuth(true);
    try {
      const response = await api.post(
        `/customer/user/change-password`,
        account
      );
      setLoadingAuth(false);
      setUser(response?.data?.data?.user);
      return;
    } catch (error) {
      setLoadingAuth(false);
      throw error?.response?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
  };
  const logout = async () => {
    setLoadingAuth(true);
    try {
      setLoadingAuth(true);
      api
        .delete(`/auth/logout`)
        .then(() => {
          setUser(null);
          // router.reload();
        })
        .catch((e) => {
          notification.error({
            message: "Lỗi",
            description: e?.response?.data?.message || "Có lỗi xảy ra",
          });
        })
        .finally(() => {
          setLoadingAuth(false);
        });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post(`/auth/forgot-password`, email);
      return response.data;
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
  };

  const verifyOTP = async (email, code) => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        email,
        token: String(code).replaceAll(/\s/g, "").replaceAll(",", "").trim(),
      });
      return response.data;
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
  };

  const resetPassword = async (email, code, password) => {
    try {
      const response = await api.post(`/auth/reset-password`, {
        email,
        token: String(code).replaceAll(/\s/g, "").replaceAll(",", "").trim(),
        password,
      });
      const { data } = response;
      if (data?.code == 200) {
        notification.success({
          message: "Thành công",
          description: data?.message || "Đổi mật khẩu thành công",
        });
      }
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
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
    setLoadingAuth,
    getUser,
    changePassword,
    forgotPassword,
    verifyOTP,
    resetPassword,
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
