import { Form, Input, Button, Space, notification } from "antd";
import Image from "next/image";
import cat from "@/public/logo.png";
import { useEffect, useState } from "react";
import { InputOTP } from "antd-input-otp";
import moment from "moment/moment";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useUser } from "../Provider/AuthProvider";

export default function ForgetPassword() {
  const { forgotPassword, resetPassword, verifyOTP } = useUser()
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  const [checkEmailForm] = Form.useForm();
  const [checkOTPForm] = Form.useForm();
  const [resetPasswordForm] = Form.useForm();

  const sendOTP = async (data = email) => {
    setLoading(true);
    try {
      if (remainingTime > 0) {
        notification.error({
          message: "Lỗi",
          description: "Vui lòng đợi 5 phút để gửi lại mã OTP",
        });
        return;
      }
      const response = await forgotPassword(data);
      if (response.code === 200) {
        notification.success({
          message: "Thành công",
          description: "Gửi mã OTP thành công. Vui lòng kiểm tra hộp thư",
        });
        setRemainingTime(response?.data?.max_age || 300);
        checkOTPForm.setFieldValue("code", null);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const handleRequestOTP = async (values) => {
    try {
      setEmail(values.email);
      sendOTP(values.email)
        .then(() => {
          setStep(2);
        })
        .catch((e) => {
          if (e?.email) {
            checkEmailForm.setFields([
              {
                name: "email",
                errors: e?.email || ["Lỗi không xác định"],
              },
            ]);
          } else {
            notification.error({
              message: "Lỗi",
              description: e,
            });
          }
        });
    } catch (error) {}
  };

  const handleCheckOTP = async (values) => {
    setLoading(true);
    const { code } = values;
    console.log(code);
    try {
      await verifyOTP(email, code)
        .then((res) => {
          setCode(code);
          notification.success({
            message: "Thành công",
            description: "Xác thực OTP thành công",
          });
          setStep(3);
        })
        .catch((e) => {
          if (e?.token) {
            checkOTPForm.setFields([
              {
                name: "code",
                errors: e?.token || ["Lỗi không xác định"],
              },
            ]);
          } else {
            notification.error({
              message: "Lỗi",
              description: e,
            });
          }
        });
    } catch (error) {
      checkOTPForm.setFields([
        {
          name: "code",
          errors: ["Mã OTP không đúng"],
        },
      ]);
    }
    setLoading(false);
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
        })
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleChangeEmail = () => {
    setCode(null);
    setRemainingTime(0);
    setStep(1);
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
    <div className="flex flex-col items-center justify-center align-center bg-secondary/[.4] h-full w-full px-2 md:px-10">
      <div className="flex flex-col items-center bg-white w-full max-w-[450px] h-fit rounded-2xl gap-2 px-5 md:px-10 py-3 md:py-5">
        <Image src={cat} className="w-14 mt-4" alt="logo"></Image>
        <div>
          <h1 className="font-bold text-lg text-center pt-2 pb-4">
            ĐẶT LẠI MẬT KHẨU
          </h1>
        </div>
        {step == 1 && (
          <motion.div
            initial={{ x: email ? -10 : 10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form
              className="flex flex-col w-full gap-2"
              onFinish={handleRequestOTP}
              form={checkEmailForm}
            >
              <p className="m-0">Nhập email đã đăng ký</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email hợp lệ",
                    type: "email",
                  },
                ]}
                className="m-0 w-full"
              >
                <Input className="w-full" placeholder="example@domain.com" />
              </Form.Item>
              <Form.Item className="w-full mt-2">
                <Button
                  htmlType="submit"
                  className="w-full bg-primary text-white"
                  
                  loading={loading}
                >
                  Gửi OTP
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        )}
        {step == 2 && (
          <motion.div
            initial={{ x: -10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form
              className="flex flex-col w-full gap-2"
              form={checkOTPForm}
              onFinish={handleCheckOTP}
            >
              <p className="m-0">
                Nhập mã OTP gửi đến{" "}
                <span className="font-semibold">{email}</span>
              </p>
              <Form.Item
                label=""
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã xác thực",
                  },
                ]}
                className="m-0 w-full"
              >
                <InputOTP
                  inputType="numeric"
                  autoSubmit={checkOTPForm}
                  inputClassName="focus:border-primary hover:border-primary"
                />
              </Form.Item>
              {remainingTime > 0 ? (
                <p className="m-0">
                  Mã OTP sẽ hết hạn sau
                  <span className="ml-1 font-semibold text-primary">
                    {moment.utc(1000 * remainingTime).format("mm:ss")}
                  </span>
                </p>
              ) : (
                <Button
                  type="link"
                  onClick={() => sendOTP(email)}
                  className="font-semibold "
                  loading={loading}
                >
                  Gửi lại mã OTP
                </Button>
              )}
              <div className="flex flex-col gap-2 w-full mt-2">
                <Form.Item className="m-0">
                  <Button
                    
                    htmlType="submit"
                    className="w-full bg-primary text-white"
                    loading={loading}
                  >
                    Xác thực
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="w-full "
                    onClick={() => handleChangeEmail()}
                    loading={loading}
                  >
                    Thay đổi email
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </motion.div>
        )}
        {step == 3 && (
          <motion.div
            initial={{ x: -10, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex w-full h-full"
          >
            <Form
              className="flex flex-col w-full gap-2"
              form={resetPasswordForm}
              onFinish={handleChangePassword}
            >
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
                <Button  htmlType='submit' className="w-full" loading={loading}>
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
