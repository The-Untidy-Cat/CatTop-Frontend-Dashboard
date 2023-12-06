import { api } from "@/utils/axios";

const searchRead = async ({
  model,
  domain,
  fields,
  limit,
  offset,
  order_by = "id",
  sort = "asc",
  relation = [],
  joins = [],
}) => {
  try {
    const response = await api.post(`/dashboard/search_read`, {
      model,
      domain,
      fields,
      limit: limit ? limit : 10,
      offset: offset ? offset : 0,
      order: sort ? sort : "asc",
      order_by: order_by ? order_by : "id",
      with: relation ? relation : [],
      joins: joins ? joins : [],
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export { searchRead };
