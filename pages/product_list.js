import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import TableTemplate from "./table_template";
import { useState } from "react";
import { Modal } from "antd";

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
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Thương hiệu",
    dataIndex: "product_brand",
    key: "product_brand",
  },
  {
    title: "Mô tả",
    dataIndex: "product_description",
    key: "product_description",
  },
  {
    title: "Giá bán",
    dataIndex: "product_price",
    key: "product_price",
  },
  {
    title: "Trạng thái",
    dataIndex: "product_status",
    key: "product_status",
  },
];

const data = [
  {
    product_id: "0001",
    product_name: <a>Asus Vivibook Flip 14 TP470(Intel)</a>,
    product_brand: "ASUS VIVOBOOK",
    product_description: "",
    product_price: "15.000.000",
    product_status: "Đang bán",
  },
  {
    product_id: "0002",
    product_name: <a>Microsoft Surface Pro 9</a>,
    product_brand: "MICROSOFT SURFACE PRO",
    product_description: "",
    product_price: "21.990.000",
    product_status: "Ngừng kinh doanh",
  },
  {
    product_id: "0003",
    product_name: <a>HP ProBook 440 G8</a>,
    product_brand: "HP PROBOOK",
    product_description: "",
    product_price: "12.990.000",
    product_status: "Sản phẩm đang hết hàng",
  },
  {
    product_id: "0005",
    product_name: <a>Dell XPS 13 9315</a>,
    product_brand: "DELL XPS",
    product_description: "",
    product_price: "26.990.000",
    product_status: "Đang bán",
  },
  
];

export default function productList() {
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
          <span class="text-2xl font-bold mr-3">Sản phẩm</span>
          <span class="font-bold text-slate-500">15 sản phẩm được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm sản phẩm"} action={action} />
 

    </DefaultLayout>
  );
}
