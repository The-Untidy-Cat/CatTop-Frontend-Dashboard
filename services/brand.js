const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllBrand = async () => {
  try {
    const response = await api.get(`/dashboard/brands`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createBrand = async (data) => {
  try {
    const response = await api.post(`/dashboard/brands`, data);
    return response?.data?.data;
  } catch (error) {
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

export { getAllBrand, createBrand };
