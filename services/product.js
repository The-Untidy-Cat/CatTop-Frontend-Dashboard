const { api } = require("@/utils/axios");
const { notification } = require("antd");
const dayjs = require("dayjs");

const getAllProduct = async ({
  filter = "name",
  keyword = "",
  limit = 10,
  offset = 0,
}) => {
  try {
    const response = await api.get(`/dashboard/products`, {
      params: {
        filter,
        keyword,
        limit,
        offset,
      }
    });
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

const getStatistic = async ({ dateRange }) => {
  try {
    const response = await api.get(`/dashboard/statistics/products`, {
      params: {
        start_date: dateRange?.[0]
          ? dayjs(dateRange?.[0]).startOf("day").toISOString()
          : undefined,
        end_date: dateRange?.[1]
          ? dayjs(dateRange?.[1]).endOf("day").toISOString()
          : undefined,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getAllProduct, createProduct, getProduct, updateProduct, getStatistic };
