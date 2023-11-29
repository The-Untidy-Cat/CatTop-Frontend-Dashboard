import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Form, Input, Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import TableTemplate from "../table_template";
import { useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { api } from "@/utils/axios";

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

const NeworderForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    >

      <p className="m-0">Tên thương hiệu</p>
      <Form.Item
        label=""
        name="brand_name"
        rules={[
          {
            required: true,
            type: "brand_name",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>

      <p className="m-0">Mô tả</p>
      <Form.Item
        label=""
        name="brand_name"
        rules={[
          {
            required: true,
            type: "brand_description",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      {/* <p className="m-0">Tên đăng nhập</p>
      <Form.Item
        label=""
        name="username"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9.\S]+$/,
            message: "Chỉ nhập chữ, số và dấu chấm!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Mật khẩu</p>
      <Form.Item
        label=""
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập Mật khẩu!" },
          { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
        ]}
        className="m-0"
      >
        <Input.Password />
      </Form.Item> */}
      <Form.Item className="m-0 mt-2">
        <Button type="primary" className="w-full" htmlType="submit">
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
};

const actions = [
  {
      key: "add",
      buttonLabel: <span class="text-white font-bold align-middle	">Thêm</span>,
      buttonType: "primary",
      buttonIcon: <span><FaPlus class ="text-white mr-2 w-2.5 align-middle"/></span>,
      title: "Thêm mới",
      children: <NeworderForm />,
      modalProps: {
          centered: true,
      },
  },
  {
      key: "edit",
      buttonLabel: <span class="font-bold align-middle	">Sửa</span>,
      buttonType: "default",
      buttonIcon: <RiPencilFill class ="mr-2 w-2.5 align-middle"/>,
      title: "Sửa",
      children: <NeworderForm />,
      modalProps: {
          centered: true,
      },
  },
];

export default function brandList() {
  const router = useRouter();
  const onSelectedRow = (data) => {
    router.push("/brands/" + data.brand_id);
  };
  const [brands, setBrands] = useState([]);
  const api_brand = () => {
    const data = api.get("https://test.ait.id.vn/v1/dashboard/brands");
    setBrands(data.data.result);
  }
  return (
    <DefaultLayout>
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Thương hiệu</span>
          <span class="font-bold text-slate-500">15 thương hiệu được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm thương hiệu"} actions={actions} onSelectedRow={onSelectedRow}/>
    </DefaultLayout>
  );
}
