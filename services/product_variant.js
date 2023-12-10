const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllProductVariant = async ({productId}) => {
  try {
    const response = await api.get(`/dashboard/products/${productId}/variants`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createProductVariant = async ({data, productId}) => {
  try {
    const response = await api.post(`/dashboard/products/${productId}/variants`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const getProductVariant = async ({productId, variantId}) => {
  try {
    const response = await api.get(`/dashboard/products/${productId}/variants/${variantId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

const updateProductVariant = async ({productId, variantId, data}) => {
  try {
    const response = await api.put(`/dashboard/products/${productId}/variants/${variantId}`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

export { getAllProductVariant, createProductVariant, getProductVariant, updateProductVariant };
