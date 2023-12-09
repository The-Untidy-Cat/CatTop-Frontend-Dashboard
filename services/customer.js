const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllCustomer = async () => {
  try {
    const response = await api.get(`/dashboard/customers`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createCustomer = async (data) => {
  try {
    const response = await api.post(`/dashboard/customers`, data);
    return response?.data?.data;
  } catch (error) {
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

const getCustomer = async (id) => {
  try {
    const response = await api.get(`/dashboard/customers/${id}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

const updateCustomer = async (id, data) => {
  try {
    const response = await api.put(`/dashboard/customers/${id}`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

export { getAllCustomer, createCustomer, getCustomer, updateCustomer };
