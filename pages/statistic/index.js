import DefaultLayout from "@/components/Layout";
import { FaPlus } from "react-icons/fa";
import TableView from "../../components/View/table";

import ReturnForm from "@/pages/return/form";
import { useRouter } from "next/router";
import StatisticBody from "./display";

export default function Statistic() {
    const router = useRouter();

    const selectedRowFunc = (data) => {
      router.push("");
    };
  
  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <ReturnForm />,
    },
  ];
  

  return (
    <DefaultLayout
      title={"Đổi trả"}
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
