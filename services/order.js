import { searchRead } from "./search_read";
import dayjs from "dayjs";
import { api } from "@/utils/axios";
import { notification } from "antd";

const getAllOrder = async ({
  filter = null,
  keyword = null,
  limit = 10,
  offset = 0,
  state = undefined,
  sort = "id",
  order = "asc",
  start_date = undefined,
  end_date = undefined,
}) => {
  try {
    const response = await api.get(`/dashboard/orders`, {
      params: {
        filter,
        keyword,
        limit,
        offset,
        state: state ? state : undefined,
        sort,
        order,
        start_date: start_date
          ? dayjs(start_date).startOf("day").toISOString()
          : undefined,
        end_date: end_date
          ? dayjs(end_date).endOf("day").toISOString()
          : undefined,
      },
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

const getUnlimitAllOrder = async ({ domain = [], fields = [] }) => {
  try {
    const response = await searchRead({
      model: "Order",
      domain: domain,
      fields: fields,
      relation: ["items:order_id,amount,total"],
    });
    return response?.records;
  } catch (e) {
    console.log(e);
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
};

const getOrder = async (id) => {
  try {
    const response = await api.get(`/dashboard/orders/${id}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const updateOrder = async (id, data) => {
  try {
    const response = await api.put(`/dashboard/orders/${id}`, data);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
};

const getStatistic = async ({ dateRange }) => {
  try {
    const response = await api.get(`/dashboard/orders/statistics`, {
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

const addOrderItem = async (id, data) => {
  try {
    const response = await api.post(`/dashboard/orders/${id}/items`, data);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

const updateOrderItem = async (orderId, itemId, data) => {
  try {
    const response = await api.put(`/dashboard/orders/${orderId}/items/${itemId}`, data);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

const deleteOrderItem = async (orderId, itemId) => {
  try {
    const response = await api.delete(`/dashboard/orders/${orderId}/items/${itemId}`);
    return response?.data?.data;
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.message,
    });
    return null;
  }
}

export {
  getAllOrder,
  createOrder,
  getUnlimitAllOrder,
  getStatistic,
  getOrder,
  updateOrder,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
