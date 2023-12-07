const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllProductVariant = async (id) => {
  try {
    const response = await api.get(`/dashboard/products/${id}/variants`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createProductVariant = async (data, id) => {
  try {
    const response = await api.post(`/dashboard/products/${id}/variants`, data);
    return response?.data?.data;
  } catch (error) {
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

export { getAllProductVariant, createProductVariant };
