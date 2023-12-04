import { createProduct } from "@/services/product";
import { searchRead } from "@/services/search_read";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export function NewProductForm({ onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [brandList, setBrandList] = useState([]); // [
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createProduct({ ...values, view_on_create: undefined })
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
      .catch((err) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleSearchBrand = async (value) => {
    try {
      const response = await searchRead(
        "Brand",
        [["name", "like", `%${value}%`]],
        ["id", "name"],
        10,
        0
      );
      setBrandList(response?.records.map((item) => { return { value: item.id, label: item.name } }));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { handleSearchBrand() }, []);


  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <p className="m-0">Tên sản phẩm</p>
      <Form.Item
        label=""
        name="product_img_url"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên sản phẩm!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Link hình ảnh</p>
      <Form.Item
        label=""
        name="product_img_url"
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
      <p className="m-0">Thương hiệu</p>
      <Form.Item
        label=""
        name="product_brand"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thương hiệu!",
          },
        ]}
        className="m-0"
      >
        <Select
          showSearch={true}
          onChange={handleChange}
          options={brandList}
          onSearch={handleSearchBrand}
          filterOption={filterOption}
        />
      </Form.Item>
      <p className="m-0">Giá</p>
      <Form.Item
        label=""
        name="product_price"
        rules={[
          {
            required: true,
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
            message: "Vui lòng nhập mô tả sản phẩm!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button type="primary" className="w-full" htmlType="submit">
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProductForm;
