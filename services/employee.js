const { api } = require("@/utils/axios");
const { notification } = require("antd");

const getAllEmployee = async () => {
  try {
    const response = await api.get(`/dashboard/employees`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const createEmployee = async (data) => {
  try {
    const response = await api.post(`/dashboard/employees`, data);
    return response?.data?.data;
  } catch (error) {
    // notification.error({
    //   message: "Error",
    //   description: error.message,
    // });
    throw error;
  }
}

const getEmployee = async (id) => {
  try {
    const response = await api.get(`/dashboard/employees/${id}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

const updateEmployee = async (id, data) => {
  try {
    const response = await api.put(`/dashboard/employees/${id}`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

export { getAllEmployee, createEmployee, getEmployee, updateEmployee };
