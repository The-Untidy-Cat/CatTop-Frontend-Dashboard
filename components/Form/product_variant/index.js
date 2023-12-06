import { PRODUCT_VARIANT_STATE } from "@/app.config";
import { createProductVariant } from "@/services/product_variant";
import { searchRead } from "@/services/search_read";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function NewProductVariantForm({ onSuccess, onClose, id }) {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [brandList, setBrandList] = useState([]); // [
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createProductVariant({ ...values, view_on_create: undefined })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/products/${res.id}`);
        } else {
          onSuccess && onSuccess();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // useEffect(() => {
  //   handleSearchBrand();
  // }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <p className="m-0">Mã sản phẩm</p>
      <Form.Item
        label=""
        name="product_id"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã sản phẩm!",
          },
        ]}
        className="m-0"
      >
        <Input value={id} defaultValue={id} />
      </Form.Item>
      <p className="m-0">Tên biến thể</p>
      <Form.Item
        label=""
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên biến thể!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">SKU</p>
      <Form.Item
        label=""
        name="SKU"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập SKU!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Link hình ảnh</p>
      <Form.Item
        label=""
        name="image"
        rules={[
          {
            required: true,
            type: "url",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Mô tả</p>
      <Form.Item
        label=""
        name="description"
        rules={[
          {
            required: true,
            type: "text",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Giá tiêu chuẩn</p>
      <Form.Item
        label=""
        name="standard_price"
        rules={[
          {
            required: true,
            message: "Giá tiêu chuẩn không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Giảm giá</p>
      <Form.Item
        label=""
        name="discount"
        rules={[
          {
            required: true,
            message: "Tỉ lệ giảm không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Thuế</p>
      <Form.Item
        label=""
        name="tax_rate"
        rules={[
          {
            required: true,
            message: "Tỉ lệ giảm không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Phí</p>
      <Form.Item
        label=""
        name="extra_fee"
        rules={[
          {
            required: true,
            message: "Tỉ lệ giảm không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>

      <p className="m-0">Trạng thái</p>
      <Form.Item
        label=""
        name="state"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thương hiệu!",
          },
        ]}
        className="m-0"
      >
        <Select
          onChange={handleChange}
          options={Object.entries(PRODUCT_VARIANT_STATE).map(([key, value]) => {
            console.log(key, value);
            return { value: key, label: value };
          })}
        />
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
export default NewProductVariantForm;
