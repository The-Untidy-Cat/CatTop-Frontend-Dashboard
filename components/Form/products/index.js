import { PRODUCT_STATE } from "@/app.config";
import { getAllBrand } from "@/services/brand";
import { createProduct, updateProduct } from "@/services/product";
import { searchRead } from "@/services/search_read";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  notification,
} from "antd";
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
            message: "Tạo sản phẩm thất bại",
            description: err.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSearchBrand = async (value) => {
    try {
      getAllBrand({
        filter: "name",
        keyword: value ?? undefined,
      }).then((response) => {
        setBrandList(
          response?.records.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleSearchBrand();
  }, []);
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
      <p className="m-0">Tên sản phẩm</p>
      <Form.Item
        name="name"
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
      <p className="m-0">Slug</p>
      <Form.Item
        name="slug"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Slug!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Link hình ảnh</p>
      <Form.Item
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
      <p className="m-0">Thương hiệu</p>
      <Form.Item
        name="brand_id"
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

export function EditProductForm({ data, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [brandList, setBrandList] = useState([]); // [
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    updateProduct(data?.id, {
      ...values,
    })
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

  const handleSearchBrand = async (value) => {
    try {
      getAllBrand({
        filter: "name",
        keyword: value ?? undefined,
      }).then((response) => {
        setBrandList(
          response?.records.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleSearchBrand().then(() => {
      form.setFieldsValue(data);
    });
  }, [data]);

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
      <p className="m-0">Tên sản phẩm</p>
      <Form.Item
        name="name"
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
      <p className="m-0">Slug</p>
      <Form.Item
        name="slug"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Slug!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Link hình ảnh</p>
      <Form.Item
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
      <p className="m-0">Thương hiệu</p>
      <Form.Item
        name="brand_id"
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
          options={brandList}
          onSearch={handleSearchBrand}
          filterOption={filterOption}
        />
      </Form.Item>
      <p className="m-0">Trạng thái</p>
      <Form.Item
        name="state"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập trạng thái!",
          },
        ]}
        className="m-0"
      >
        <Select
          options={Object.keys(PRODUCT_STATE).map((key) => ({
            label: PRODUCT_STATE[key],
            value: key,
          }))}
          className="w-full"
        />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          className="w-full bg-primary text-white"
          htmlType="submit"
          loading={loading}
        >
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewProductForm;
