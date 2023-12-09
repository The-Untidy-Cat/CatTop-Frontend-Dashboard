import { searchRead } from "./search_read";
import dayjs from "dayjs";
import { api } from "@/utils/axios";
import { notification } from "antd";

const getAllOrder = async ({
  keyword = null,
  limit = 10,
  offset = 0,
  state = undefined,
}) => {
  try {
    const response = await api.get(`/dashboard/orders`, {
      params: {
        keyword,
        limit,
        offset,
        state: state ? state : undefined,
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

const getStatistic = async ({ dateRange }) => {
  try {
    const response = await api.get(`/dashboard/statistics/orders`, {
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

export { getAllOrder, createOrder, getUnlimitAllOrder, getStatistic };
