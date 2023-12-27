import DefaultLayout from "@/components/Layout";
import OrderStatistic from "@/components/View/statistic/order";
import { useRouter } from "next/router";
import { OrderList } from "./orders";
import ProductStatistic from "@/components/View/statistic/product";

export default function Home() {
  return (
    <DefaultLayout
      activeKey={"home"}
      title="Tổng quan"
      breadcrumb={[
        {
          href: "/",
          title: "Tổng quan",
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div className="flex flex-col grow-0 h-fit">
          <OrderList />
        </div>
        <div className="flex flex-col h-fit grow-0">
          <h2 className="text-lg font-semibold shrink-0 mb-1">
            Thống kê đơn hàng
          </h2>
          <OrderStatistic />
        </div>
      </div>
      <div className="flex col-span-2 flex-col h-full">
        <ProductStatistic />
      </div>
    </DefaultLayout>
  );
}
