import { useUser } from "../Provider/AuthProvider";
import { Button, Drawer, Form, Input } from "antd";
import Link from "next/link";
import { AiOutlineLaptop } from "react-icons/ai";
import { useState } from "react";
import ForgotPassword from "./forgot";

export default function Login() {
  const { login } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    login(values)
      .catch((error) => {
        console.log(error);
        form.setFields([
          {
            name: "password",
            errors: ["Tên đăng nhập hoặc mật khẩu không đúng"],
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex w-full h-full justify-center align-center items-center p-5 md:p-0 bg-primary">
      <div className="flex flex-col w-full max-w-lg gap-2 border rounded drop-shadow-sm p-5 md:p-8 bg-white">
        <h2 className="flex justify-center items-end gap-2 text-sm md:text-xl font-bold">
          <AiOutlineLaptop className="text-2xl md:text-4xl text-primary" />
          CatTop
        </h2>
        <h1 className="text-lg md:text-xl font-bold">Đăng nhập</h1>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          className="flex flex-col w-full gap-2"
          disabled={loading}
        >
          <Form.ErrorList />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="username">
              Tên đăng nhập
            </label>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
              ]}
              className="m-0 p-0"
            >
              <Input
                className="w-full h-10 px-3 rounded border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="admin"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
              Mật khẩu
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
              className="m-0 p-0"
            >
              <Input.Password
                className="w-full h-10 px-3 rounded border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="admin"
              />
            </Form.Item>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 mt-2">
            <Button
              size="small"
              type="link"
              className="text-primary"
              onClick={() => setOpenForgotPassword(true)}
            >
              Quên mật khẩu?
            </Button>
            <Drawer
              open={openForgotPassword}
              title="Quên mật khẩu"
              onClose={() => setOpenForgotPassword(false)}
              placement="bottom"
              height="fit-content"
            >
              <ForgotPassword />
            </Drawer>
            <Form.Item className="m-0 p-0">
              <Button htmlType="submit" className="bg-primary text-white">
                Xác thực
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

