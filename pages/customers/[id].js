import DefaultLayout from "@/components/Layout";
import { Divider, Table } from "antd";
import { useRouter } from "next/router";

const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customer_id",
      key: "customer_id",
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
    

export default function Customer (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <p>Thông tin khách hàng</p>
            <p>Tên khách hàng: </p>
            <p>Mã khách hàng: {id}</p>
            <p>Địa chỉ: </p>
            <p>Số điện thoại: </p>
            <p>Email: </p>
            <p>Giới tính: </p>
            <p>Ngày sinh: </p>
            <p>Ngày tạo: </p>

            <Divider />
            <p>Danh sách đơn hàng</p>
            <Table dataSource={data} columns={columns} />
        </DefaultLayout>
    )
}