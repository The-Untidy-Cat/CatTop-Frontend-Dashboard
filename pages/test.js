import { ModalToggle } from "@/components/Modal";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Return from "./orders/return/index";

const NewCustomerForm = () => {
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
          <p className="m-0">Họ</p>
          <Form.Item
            name="last_name"
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
          <p className="m-0">Tên</p>
          <Form.Item
            name="first_name"
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

      <p className="m-0">Email</p>
      <Form.Item
        label=""
        name="email"
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
      <p className="m-0">Số điện thoại</p>
      <Form.Item
        label=""
        name="phone_number"
        rules={[
          {
            required: true,
            pattern:
              /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button type="primary" className="w-full" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

const acitons = [
  {
    key: "add",
    buttonLabel: "Thêm",
    buttonType: "primary",
    buttonIcon: <AiFillPlusCircle />,
    title: "Thêm mới",
    children: <NewCustomerForm />,
    modalProps: {
      centered: true,
    },
  },
  {
    key: "edit",
    buttonLabel: "Sửa",
    buttonType: "default",
    buttonIcon: <AiFillPlusCircle />,
    title: "Sửa",
    children: <NewCustomerForm />,
    modalProps: {
      centered: true,
    },
  },
];

// trong table template gì đó
const App = () => {
  return(
    // <div>
      <Return/>
    // </div>
  );
};
export default App;
