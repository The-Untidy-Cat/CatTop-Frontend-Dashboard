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

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
      </div>

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giá vốn</p>
          <Form.Item
            label=""
            name="cost_price"
            rules={[
              {
                required: true,
                message: "Giá vốn không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giá bán</p>
          <Form.Item
            label=""
            name="sale_price"
            rules={[
              {
                required: true,
                message: "Giá bán không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* CPU */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tên CPU</p>
          <Form.Item
            label=""
            name="specifications.cpu.name"
            rules={[
              {
                required: true,
                message: "Tên CPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Số nhân CPU</p>
          <Form.Item
            label=""
            name="specifications.cpu.cores"
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
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Số luồng CPU</p>
          <Form.Item
            label=""
            name="specifications.cpu.threads"
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
        </div>
      </div>

      {/* CPU */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tốc độ của vi xử lý</p>
          <Form.Item
            label=""
            name="specifications.cpu.base_clock"
            rules={[
              {
                required: true,
                message: "Tốc độ của vi xử lý không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Xung clock</p>
          <Form.Item
            label=""
            name="specifications.cpu.turbo_clock"
            rules={[
              {
                required: true,
                message: "Giá vốn không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Bộ nhớ đệm CPU</p>
          <Form.Item
            label=""
            name="specifications.cpu.cache"
            rules={[
              {
                required: true,
                message: "Bộ nhớ đệm CPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* RAM */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Dung lượng RAM</p>
          <Form.Item
            label=""
            name="specifications.ram.capacity"
            rules={[
              {
                required: true,
                message: "Dung lượng RAM không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Loại RAM</p>
          <Form.Item
            label=""
            name="specifications.ram.type"
            rules={[
              {
                required: true,
                message: "Loại RAM hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tần số RAM</p>
          <Form.Item
            label=""
            name="specifications.ram.frequency"
            rules={[
              {
                required: true,
                message: "Tần số RAM không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Storage */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Ổ lưu trữ</p>
          <Form.Item
            label=""
            name="specifications.storage.drive"
            rules={[
              {
                required: true,
                message: "Thông tin không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Dung lượng lưu trữ</p>
          <Form.Item
            label=""
            name="specifications.storage.capacity"
            rules={[
              {
                required: true,
                message: "Dung lượng không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Loại lưu trữ</p>
          <Form.Item
            label=""
            name="specifications.storage.type"
            rules={[
              {
                required: true,
                message: "Loại lưu trữ không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Display */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Công nghệ hiển thị</p>
          <Form.Item
            label=""
            name="specifications.display.technology"
            rules={[
              {
                required: true,
                message: "Thông tin không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tần số quét</p>
          <Form.Item
            label=""
            name="specifications.display.refresh_rate"
            rules={[
              {
                required: true,
                message: "Tần số quét không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Cảm ứng</p>
          <Form.Item
            label=""
            name="specifications.display.touch"
            rules={[
              {
                required: true,
                message: "Thông tin không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Graphics */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tên GPU</p>
          <Form.Item
            label=""
            name="specifications.gpu.name"
            rules={[
              {
                required: true,
                message: "Tên GPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Bộ nhớ GPU</p>
          <Form.Item
            label=""
            name="specifications.gpu.memory"
            rules={[
              {
                required: true,
                message: "Bộ nhớ GPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Loại GPU</p>
          <Form.Item
            label=""
            name="specifications.gpu.type"
            rules={[
              {
                required: true,
                message: "Loại GPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Graphics */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Tần số GPU</p>
          <Form.Item
            label=""
            name="specifications.gpu.frequency"
            rules={[
              {
                required: true,
                message: "Tần số GPU không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Số cổng</p>
          <Form.Item
            label=""
            name="specifications.ports"
            rules={[
              {
                required: true,
                message: "Số cổng không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Bàn phím</p>
          <Form.Item
            label=""
            name="specifications.keyboard"
            rules={[
              {
                required: true,
                message: "Bàn phím không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Other */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Touchpad</p>
          <Form.Item
            label=""
            name="specifications.touchpad"
            rules={[
              {
                required: true,
                message: "Touchpad không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Webcam</p>
          <Form.Item
            label=""
            name="specifications.webcam"
            rules={[
              {
                required: true,
                message: "Webcam không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Pin</p>
          <Form.Item
            label=""
            name="specifications.battery"
            rules={[
              {
                required: true,
                message: "Pin không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      {/* Other */}
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Khối lượng</p>
          <Form.Item
            label=""
            name="specifications.weight"
            rules={[
              {
                required: true,
                message: "Khối lượng không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Hệ điều hành</p>
          <Form.Item
            label=""
            name="specifications.os"
            rules={[
              {
                required: true,
                message: "Hệ điều hành không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Bảo hành</p>
          <Form.Item
            label=""
            name="specifications.warranty"
            rules={[
              {
                required: true,
                message: "Bảo hành không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      <p className="m-0">Màu sắc</p>
      <Form.Item
        label=""
        name="specifications.color"
        rules={[
          {
            required: true,
            message: "Màu sắc không hợp lệ!",
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
