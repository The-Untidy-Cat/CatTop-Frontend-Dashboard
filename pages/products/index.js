import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Form, Input, Button } from "antd";
import TableTemplate from "../table_template";
import { useState } from "react";
import { Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
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

const NewProductForm = () => {
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
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Mã sản phẩm</p>
          <Form.Item
            name="product_id"
            rules={[
              {
                required: true,
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <p className="m-0">Tên sản phẩm</p>
          <Form.Item
            name="product_name"
            rules={[
              {
                required: true,
                pattern:
                  /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      <p className="m-0">Thương hiệu</p>
      <Form.Item
        label=""
        name="product_brand"
        rules={[
          {
            required: true,
            type: "email",
            message: "Email không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Giá</p>
      <Form.Item
        label=""
        name="product_price"
        rules={[
          {
            required: true,
            pattern:
              /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
            message: "Giá không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Mô tả</p>
      <Form.Item
        label=""
        name="product_description"
        rules={[
          {
            required: true,
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
          Thêm
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
      children: <NewProductForm />,
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
      children: <NewProductForm />,
      modalProps: {
          centered: true,
      },
  },
];

export default function productList() {
  const router = useRouter();
  const onSelectedRow = (data) => {
    router.push("/products/" + data.product_id);
  }
  return (
    <DefaultLayout>
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Sản phẩm</span>
          <span class="font-bold text-slate-500">15 sản phẩm được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm sản phẩm"} actions={actions} onSelectedRow={onSelectedRow}/>


    </DefaultLayout>
  );
}
