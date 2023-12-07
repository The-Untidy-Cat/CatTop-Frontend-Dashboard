import DefaultLayout from "@/components/Layout";
// import { FaPlus } from "react-icons/fa";
// import TableView from "../../../components/View/table";
// import ReturnForm from "@/pages/orders/return/form";
// import { useRouter } from "next/router";
import StatisticBody from "./display";

export default function Statistic() {
  
  return (
    <DefaultLayout
      title={"Đổi trả"}
      breadcrumb={[
        {
          href: "/orders",
          title: "Đơn hàng",
        },
        {
          href: "/orders/statistic",
          title: "Thống kê",
        },
      ]}
    >
      <StatisticBody/>
    </DefaultLayout>
  );
}
