import { Button } from "antd";
import { searchRead } from "@/services/search_read";
import { useEffect, useState } from "react";
import { useAmp } from "next/amp";
import { api } from "@/utils/axios";
import { getUnlimitAllOrder } from "@/services/order";

export default function Apps() {
  const limit = 5;
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await searchRead({
  //       model: "Order",
  //       domain: keyword ? [["name", "=", keyword]] : [],
  //       fields: ["order_id", "customer_id","employee_id", "create_at","payment_state","state"],
  //       limit,
  //       offset,
  //       relation: ["customer:id, first_name","employee:id, first_name"],
  //     });
  //     console.log(response);
  //     // setBrands(response?.records.map((item) => ({ ...item, key: item.id })));
  //     // setLength(response?.length);
  //     // setOffset(response?.offset);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  //   setLoading(false);
  // };

  const getData = async () => {
    const response = await api.get('/dashboard/orders', {
      params: {
        limit: 1000,
      },
    });
    console.log(response);
  };
  return (<Button onClick={getData}>ABC</Button>);
}