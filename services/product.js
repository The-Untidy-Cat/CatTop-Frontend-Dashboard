const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllProduct = async () => {
  try {
    const response = await api.get(`/dashboard/products`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createProduct = async (data) => {
  try {
    const response = await api.post(`/dashboard/products`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/dashboard/products/${id}`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

const getProduct = async (id) => {
  try {
    const response = await api.get(`/dashboard/products/${id}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

export { getAllProduct, createProduct, getProduct, updateProduct };
