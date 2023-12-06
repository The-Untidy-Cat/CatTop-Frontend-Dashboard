const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllOrder = async () => {
  try {
    const response = await api.get(`/dashboard/orders`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createOrder = async (data) => {
  try {
    const response = await api.post(`/dashboard/orders`, data);
    return response?.data?.data;
  } catch (error) {
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

export { getAllOrder, createOrder };
