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
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

export { getAllProduct, createProduct };
