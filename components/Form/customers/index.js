import { CUSTOMER_GENDER } from "@/app.config";
import { createCustomer, updateCustomer } from "@/services/customer";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function EditCustomerForm({ data, onSuccess, onClose }) 
{
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    updateCustomer(data?.id, { ...values })
      .then((res) => {
        onSuccess && onSuccess();
        onClose && onClose();
      })
      .catch((err) => {
        if (err?.response?.data?.errors) {
          form.setFields(
            Object.entries(err?.response?.data?.errors).map(([key, value]) => {
              return {
                name: key,
                errors: [value],
              };
            })
          );
        } else {
          notification.error({
            message: "Cập nhật sản phẩm thất bại",
            description: err.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
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

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Ngày sinh</p>
          <Form.Item
            label=""
            name="date_of_birth"
            rules={[
              {
                required: true,
                type: "date",
                message: "Ngày sinh không không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giới tính</p>
          <Form.Item
            label=""
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính!",
              },
            ]}
            className="m-0"
          >
            <Select
              options={Object.keys(CUSTOMER_GENDER).map((key) => ({
                label: CUSTOMER_GENDER[key],
                value: key,
              }))}
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item name="view_on_create" valuePropName="checked" className="m-0">
        <Checkbox>Xem sau khi tạo</Checkbox>
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          className="w-full bg-primary text-white"
          htmlType="submit"
          loading={loading}
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export function NewCustomerForm({ onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createCustomer({
      ...values,
      gender: Number(values.gender),
      date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
      view_on_create: undefined,
    })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/customers/${res.id}`);
        } else {
          onSuccess && onSuccess();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
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

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Ngày sinh</p>
          <Form.Item
            label=""
            name="date_of_birth"
            rules={[
              {
                required: true,
                type: "date",
                message: "Ngày sinh không không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giới tính</p>
          <Form.Item
            label=""
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính!",
              },
            ]}
            className="m-0"
          >
            <Select
              options={Object.keys(CUSTOMER_GENDER).map((key) => ({
                label: CUSTOMER_GENDER[key],
                value: key,
              }))}
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item name="view_on_create" valuePropName="checked" className="m-0">
        <Checkbox>Xem sau khi tạo</Checkbox>
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          className="w-full bg-primary text-white"
          htmlType="submit"
          loading={loading}
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewCustomerForm;
