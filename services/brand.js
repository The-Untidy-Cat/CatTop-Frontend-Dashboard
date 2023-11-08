const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllBrand = async () => {
  try {
    const response = await api.get(`/web/brands`);
    return response.data.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

export { getAllBrand };
