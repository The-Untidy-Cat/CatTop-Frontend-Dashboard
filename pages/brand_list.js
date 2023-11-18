import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import TableTemplate from "./table_template";
import { useState } from "react";
import { Modal } from "antd";

const columns = [
  {
    title: "Mã thương hiệu",
    dataIndex: "brand_id",
    key: "brand_id",
  },
  {
    title: "Tên thương hiệu",
    dataIndex: "brand_name",
    key: "brand_name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Mô tả",
    dataIndex: "brand_description",
    key: "brand_description",
  },
];

const data = [
  {
    brand_id: "0001",
    brand_name: "DELL",
    brand_description: "",
  },
  {
    brand_id: "0002",
    brand_name: "LENOVO",
    brand_description: "",
  },
  {
    brand_id: "0003",
    brand_name: "LG",
    brand_description: "",
  },
  {
    brand_id: "0005",
    brand_name: "ASUS",
    brand_description: "",
  },
  {
    brand_id: "0006",
    brand_name: "HP",
    brand_description: "",
  },
  {
    brand_id: "0007",
    brand_name: "APPLE",
    brand_description: "",
  },
  {
    brand_id: "0008",
    brand_name: "ACER",
    brand_description: "",
  },
  {
    brand_id: "0009",
    brand_name: "GIGABYTE",
    brand_description: "",
  },
  {
    brand_id: "0010",
    brand_name: "VAIO",
    brand_description: "",
  },
  {
    brand_id: "0011",
    brand_name: "MSI",
    brand_description: "",
  },
];

export default function brandList() {
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
          <span class="text-2xl font-bold mr-3">Thương hiệu</span>
          <span class="font-bold text-slate-500">15 thương hiệu được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm thương hiệu"} action={action} />
 

    </DefaultLayout>
  );
}
