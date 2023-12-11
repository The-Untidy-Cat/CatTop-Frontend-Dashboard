import DefaultLayout from "@/components/Layout";
import OrderStatistic from "@/components/View/statistic/order";
import { useRouter } from "next/router";
import { OrderList } from "./orders";

export default function Home() {
  const router = useRouter();
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-fit">
        <div className="w-full">
          <OrderList />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold shrink-0 mb-1">
            Thống kê đơn hàng
          </h2>
          <OrderStatistic />
        </div>
        {/* <h2 className="text-lg font-semibold shrink-0">Thống kê sản phẩm</h2> */}
      </div>
    </DefaultLayout>
  );
}
