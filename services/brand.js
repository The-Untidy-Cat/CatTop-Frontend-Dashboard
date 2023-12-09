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

const getBrand = async (id) => {
  try {
    const response = await api.get(`/dashboard/brands/${id}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

const updateBrand = async (id, data) => {
  try {
    const response = await api.put(`/dashboard/brands/${id}`, data);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

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

export { getAllBrand, createBrand, getBrand, updateBrand };
