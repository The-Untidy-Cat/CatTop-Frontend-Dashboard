import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import TableTemplate from "./table_template";
import { useState } from "react";
import { Modal } from "antd";

const columns = [
  {
    title: "Mã khách hàng",
    dataIndex: "customer_id",
    key: "customer_id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Email",
    dataIndex: "customer_email",
    key: "customer_email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "customer_phone",
    key: "customer_phone",
  },
  {
    title: "Địa chỉ",
    dataIndex: "customer_address",
    key: "customer_address",
  },
  {
    title: "Ngày khởi tạo",
    dataIndex: "initial_date",
    key: "initial_date",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

const data = [
  {
    customer_id: "0001",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0002",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0003",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0004",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
];

export default function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const action = [
    {
      text: "Thêm mới",
      icon: <AiOutlineSearch />,
      onClick: () => {
        Modal.info({
          title: "test",
          content: "test"
        })
      }
    }
  ]
  return (
    <DefaultLayout>
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Khách hàng</span>
          <span class="font-bold text-slate-500">15 khách hàng được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm khách hàng"} action={action} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </DefaultLayout>
  );
}
