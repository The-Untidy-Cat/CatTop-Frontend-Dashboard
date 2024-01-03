import { BRAND_STATE } from "@/app.config";
import { createBrand, updateBrand } from "@/services/brand";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function NewBrandForm({ onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createBrand({ ...values, view_on_create: undefined })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/products/brands/${res.id}`);
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
      <p className="m-0">Tên thương hiệu</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thương hiệu!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Đường dẫn Logo</p>
      <Form.Item
        name="image"
        rules={[
          {
            required: true,
            type: "url",
            message: "Vui lòng nhập đường dẫn hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
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

export function EditBrandForm({ data, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    if (!data) return;
    updateBrand(data?.id, values)
      .then((res) => {
        onSuccess && onSuccess();
        onClose && onClose();
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <p className="m-0">Tên thương hiệu</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thương hiệu!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Đường dẫn Logo</p>
      <Form.Item
        name="image"
        rules={[
          {
            required: true,
            type: "url",
            message: "Vui lòng nhập đường dẫn hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Trạng thái</p>
      <Form.Item
        name="state"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn giá trị hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Select
          options={Object.keys(BRAND_STATE).map((value) => ({
            value,
            label: BRAND_STATE[value],
          }))}
          className="w-full"
          placeholder="Trống"
        />
      </Form.Item>
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

export default NewBrandForm;
