import { Form, Input, Button, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../Provider/AuthProvider";

export default function ForgotPassword() {
  const { forgotPassword, resetPassword } = useUser();
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resetPasswordForm] = Form.useForm();

  const sendOTP = async () => {
    setLoading(true);
    try {
      const email = await resetPasswordForm.validateFields(["email"]);
      if (!email) {
        return;
      }
      if (remainingTime > 0) {
        notification.error({
          message: "Lỗi",
          description: "Vui lòng đợi 5 phút để gửi lại mã OTP",
        });
        return;
      }
      const response = await forgotPassword(email);
      if (response.code === 200) {
        notification.success({
          message: "Thành công",
          description: "Gửi mã OTP thành công. Vui lòng kiểm tra hộp thư",
        });
        setRemainingTime(response?.data?.max_age || 300);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      if (values.password !== values.confirm_password) {
        resetPasswordForm.setFields([
          {
            name: "confirm_password",
            errors: ["Xác nhận mật khẩu không khớp"],
          },
        ]);
        return;
      }
      resetPassword(email, code, values.password).catch((e) => {
        notification.error({
          message: "Lỗi",
          description: e?.message || "Lỗi không xác định",
        });
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    }
  }, [remainingTime]);
  0;
  return (
    <div className="flex flex-col items-center justify-center align-center h-full w-full">
      <div className="flex flex-col items-center w-full max-w-[450px] h-fit gap-2">
        <Form
          className="flex flex-col w-full gap-2"
          form={resetPasswordForm}
          onFinish={handleChangePassword}
        >
          <div className="flex flex-col w-full gap-2">
            <p className="m-0">Email</p>
            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
              className="m-0 w-full"
            >
              <Input className="border" onChange={()=> setRemainingTime(0)}/>
            </Form.Item>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="m-0">Mã OTP</p>
            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã OTP được gửi về email",
                },
              ]}
              className="m-0 w-full"
            >
              <Input
                addonBefore={
                  <Button onClick={sendOTP} disabled={remainingTime > 0} type='text' size="small">
                    Gửi mã OTP
                  </Button>
                }
              />
            </Form.Item>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="m-0">Nhập mật khẩu mới</p>
            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                  min: 8,
                },
              ]}
              className="m-0 w-full"
            >
              <Input.Password className="border"></Input.Password>
            </Form.Item>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="m-0">Xác nhận mật khẩu mới</p>
            <Form.Item
              label=""
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Xác nhận mật khẩu không khớp!")
                    );
                  },
                }),
              ]}
              className="m-0 w-full"
            >
              <Input.Password className="border" />
            </Form.Item>
          </div>
          <Form.Item className="w-full mt-2">
            <Button htmlType="submit" className="w-full" loading={loading}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
