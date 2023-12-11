import DefaultLayout from "@/components/Layout";
import OrderStatistic from "@/components/View/statistic/order";

export default function Statistic() {
  
  return (
    <DefaultLayout
      title={"Thống kê"}
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
      activeKey={"order-statistic"}
    >
      <OrderStatistic/>
    </DefaultLayout>
  );
}
