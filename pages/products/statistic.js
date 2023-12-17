import DefaultLayout from "@/components/Layout";
import ProductStatistic from "@/components/View/statistic/product";

export default function Statistic() {
  
  return (
    <DefaultLayout
      title={"Thống kê"}
      breadcrumb={[
        {
          href: "/products",
          title: "Sản phẩm",
        },
        {
          href: "/products/statistic",
          title: "Thống kê",
        },
      ]}
      activeKey={"product-statistic"}
    >
      <ProductStatistic/>
    </DefaultLayout>
  );
}
