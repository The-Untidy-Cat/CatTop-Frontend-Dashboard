import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Tình trạng",
      dataIndex: "order_status",
      key: "order_status",
    },
  ];

const data = [
    {
      order_id: "1",
      customer_name: "John Brown",
      customer_id: "32",
      address: "New York No. 1 Lake Park",
      order_date: "2021-10-10",
      total: "1000",
      order_status: "Đang xử lý",
    }]
    

export default function Products (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Product {id}</h1>


        </DefaultLayout>
    )
}