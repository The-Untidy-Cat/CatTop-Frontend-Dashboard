import { searchRead } from "./search_read";

const { api } = require("@/utils/axios");
const { notification } = require("antd");

// đừng có đụng vào cái này, cái này api của Ngọc
// lúc merge vào bị lỗi tùm lum nữa
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

const getUnlimitAllOrder = async ({
  domain =  [],
  fields =  [],
}) => {
  try {
    const response = await searchRead(
      {
        model: "Order",
        domain: domain,
        fields: fields,
        relation: [
          "items:order_id,amount,total",
        ],
        
      }
    )
    return response?.records;
  } catch (e) {
    console.log(e)
    return null
  }
}

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

export { getAllOrder, createOrder, getUnlimitAllOrder };
