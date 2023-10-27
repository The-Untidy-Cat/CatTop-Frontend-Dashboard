import { api } from "@/utils/axios";
import { useAuth } from "../Provider/AuthProvider";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { AiOutlineLaptop } from "react-icons/ai";

export default function Login() {
  const { login } = useAuth();
  const handleSubmit = async (values) => {
    const csrf = await api.get("/auth/csrf");
    console.log(csrf);
    const response = await api.post("/auth/dash", values,  {
      headers: {
        "X-CSRF-Token":  "eyJpdiI6IkVKVEE4Szd4bGNnNi9SVGZ6UHEwRFE9PSIsInZhbHVlIjoibDZOR1ZqeVB4VStnbnUyemRFQ3IyWGNkN0hzR0VLeGsvZlphM0JWN0RHdUtLbTYxSUhyWkswNGZ6d2E1Y3p4WEFpaEJrNTYxMWxuRmFvZ2pYd3o3K3RycDBlRG1UY29xZElDS2RLbkl2bWJrRU9Ha0JJSnJ1MExEclBaT3ZKVUQiLCJtYWMiOiI3OTRjYTcyZTk5MjgyNDYwMGYxMTY0YmM3MGJmMGI3M2Y5Mzg5MzA2NTBmNTlkMGZhZGRhM2NlNzVjNTMxY2JjIiwidGFnIjoiIn0=",
      },
    });
    console.log(response);
  }
  const onFinish = (values) => {
    login(values);
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
          name="login"
          onFinish={handleSubmit}
          className="flex flex-col w-full gap-2"
        >
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
            <Link href="#forgot-password">Quên mật khẩu?</Link>
            <Form.Item className="m-0 p-0">
              <Button type="primary" htmlType="submit">
                Xác thực
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
