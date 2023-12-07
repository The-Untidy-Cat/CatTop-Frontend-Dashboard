import DefaultLayout from "@/components/Layout";
import StatisticBody from "./display";
import { useEffect } from "react";
import { api } from "@/utils/axios";
import { getAllOrder } from "@/services/order";
export default function Statistic() {

  // const handleAxios = async () => {
  //   const response = await api.get(`/dashboard/orders`);
  //   console.log(response);
  // }
  // useEffect(() => {
  //   console.log("App");
  //   handleAxios();
  // }, []);
  return (
    <DefaultLayout
      title={"Thống kê"}
      breadcrumb={[
        {
          href: "/statistic",
          title: "Thống kê",
        },
      ]}
    >
      <StatisticBody/>
    </DefaultLayout>
  );
}
