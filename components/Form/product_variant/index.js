import { PRODUCT_VARIANT_STATE } from "@/app.config";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tabs,
  notification,
} from "antd";
import { useEffect, useState } from "react";

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SpecificationsFormItem = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "CPU",
          key: "cpu",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-3">
                <p className="m-0">Tên CPU</p>
                <Form.Item
                  name="specifications.cpu.name"
                  rules={[
                    {
                      required: true,
                      message: "Tên CPU không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Số nhân CPU</p>
                <Form.Item
                  name="specifications.cpu.cores"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={1} step={1} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Số luồng CPU</p>
                <Form.Item
                  name="specifications.cpu.threads"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={1} step={1} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Xung cơ bản</p>
                <Form.Item
                  name="specifications.cpu.base_clock"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Xung Turbo</p>
                <Form.Item
                  name="specifications.cpu.turbo_clock"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Bộ nhớ đệm (MB)</p>
                <Form.Item
                  name="specifications.cpu.cache"
                  rules={[
                    {
                      required: true,
                      message: "Giá trịkhông hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </div>
            </div>
          ),
        },
        {
          label: "RAM",
          key: "ram",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Dung lượng (MB)</p>
                <Form.Item
                  name="specifications.ram.capacity"
                  rules={[
                    {
                      required: true,
                      message: "Dung lượng RAM không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: 4096, label: "4GB" },
                      { value: 8192, label: "8GB" },
                      { value: 12288, label: "12GB" },
                      { value: 16384, label: "16GB" },
                      { value: 32768, label: "32GB" },
                      { value: 65536, label: "64GB" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Bus</p>
                <Form.Item
                  name="specifications.ram.type"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "DDR3", label: "DDR3" },
                      { value: "DDR4", label: "DDR4" },
                      { value: "DDR5", label: "DDR5" },
                      { value: "DDR6", label: "DDR6" },
                      { value: "LPDDR3", label: "LPDDR3" },
                      { value: "LPDDR4", label: "LPDDR4" },
                      { value: "LPDDR5", label: "LPDDR5" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Tốc độ</p>
                <Form.Item
                  name="specifications.ram.frequency"
                  rules={[
                    {
                      required: true,
                      message: "Tần số RAM không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: 800, label: "800 MHz" },
                      { value: 1066, label: "1066 MHz" },
                      { value: 1333, label: "1333 MHz" },
                      { value: 1600, label: "1600 MHz" },
                      { value: 1866, label: "1866 MHz" },
                      { value: 2133, label: "2133 MHz" },
                      { value: 2400, label: "2400 MHz" },
                      { value: 2666, label: "2666 MHz" },
                      { value: 3000, label: "3000 MHz" },
                      { value: 3200, label: "3200 MHz" },
                      { value: 3466, label: "3466 MHz" },
                      { value: 3600, label: "3600 MHz" },
                      { value: 3733, label: "3733 MHz" },
                      { value: 3866, label: "3866 MHz" },
                      { value: 4000, label: "4000 MHz" },
                      { value: 4133, label: "4133 MHz" },
                      { value: 4266, label: "4266 MHz" },
                      { value: 4466, label: "4466 MHz" },
                      { value: 4600, label: "4600 MHz" },
                      { value: 4800, label: "4800 MHz" },
                      { value: 5000, label: "5000 MHz" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          ),
        },
        {
          label: "Lưu trữ",
          key: "storage",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Ổ lưu trữ</p>
                <Form.Item
                  name="specifications.storage.drive"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "HDD", label: "Hard Disk Drive" },
                      { value: "SSD", label: "Solid State Drive" },
                      { value: "SSHD", label: "Solid State Hybrid Drive" },
                      { value: "ODD", label: "Optical Disk Drive" },
                      { value: "USB", label: "USB Flash Drive" },
                      { value: "MC", label: "Memory Card" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Dung lượng (GB)</p>
                <Form.Item
                  name="specifications.storage.capacity"
                  rules={[
                    {
                      required: true,
                      message: "Dung lượng không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Loại lưu trữ</p>
                <Form.Item
                  name="specifications.storage.type"
                  rules={[
                    {
                      required: true,
                      message: "Loại lưu trữ không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "SATA", label: "SATA" },
                      { value: "M.2 SATA", label: "M.2 SATA" },
                      { value: "M.2 NVMe", label: "M.2 NVMe" },
                      { value: "PCIe", label: "PCIe" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          ),
        },
        {
          label: "Hiển thị",
          key: "display",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Công nghệ hiển thị</p>
                <Form.Item
                  name="specifications.display_technology"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "LCD", label: "Màn LCD" },
                      { value: "OLED", label: "Màn OLED" },
                      { value: "QLED", label: "Màn QLED" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Tần số quét</p>
                <Form.Item
                  name="specifications.display_refresh_rate"
                  rules={[
                    {
                      required: true,
                      message: "Tần số quét không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: 50, label: "50 Hz" },
                      { value: 60, label: "60 Hz" },
                      { value: 90, label: "90 Hz" },
                      { value: 100, label: "100 Hz" },
                      { value: 120, label: "120 Hz" },
                      { value: 144, label: "144 Hz" },
                      { value: 240, label: "240 Hz" },
                      { value: 300, label: "300 Hz" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Cảm ứng</p>
                <Form.Item
                  name="specifications.display_touch"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: true, label: "Có" },
                      { value: false, label: "Không" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          ),
        },
        {
          label: "Đồ hoạ",
          key: "graphics",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-3">
                <p className="m-0">Tên GPU</p>
                <Form.Item
                  name="specifications.gpu_name"
                  rules={[
                    {
                      required: true,
                      message: "Tên GPU không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Bộ nhớ</p>
                <Form.Item
                  name="specifications.gpu_memory"
                  rules={[
                    {
                      required: true,
                      message: "Giá trị không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: 1, label: "1GB" },
                      { value: 2, label: "2GB" },
                      { value: 3, label: "3GB" },
                      { value: 4, label: "4GB" },
                      { value: 6, label: "6GB" },
                      { value: 8, label: "8GB" },
                      { value: 10, label: "10GB" },
                      { value: 11, label: "11GB" },
                      { value: 12, label: "12GB" },
                      { value: 16, label: "16GB" },
                      { value: 24, label: "24GB" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Loại GPU</p>
                <Form.Item
                  name="specifications.gpu_type"
                  rules={[
                    {
                      required: true,
                      message: "Loại GPU không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "Dedicated", label: "Dedicated" },
                      { value: "Integrated", label: "Integrated" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Tần số GPU</p>
                <Form.Item
                  name="specifications.gpu_frequency"
                  rules={[
                    {
                      required: true,
                      message: "Tần số GPU không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: 800, label: "800 MHz" },
                      { value: 850, label: "850 MHz" },
                      { value: 900, label: "900 MHz" },
                      { value: 950, label: "950 MHz" },
                      { value: 1000, label: "1.0 GHz" },
                      { value: 1150, label: "1.15 GHz" },
                      { value: 1200, label: "1.2 GHz" },
                      { value: 1250, label: "1.25 GHz" },
                      { value: 1300, label: "1.3 GHz" },
                      { value: 1350, label: "1.35 GHz" },
                      { value: 1400, label: "1.4 GHz" },
                      { value: 1450, label: "1.45 GHz" },
                      { value: 1500, label: "1.5 GHz" },
                      { value: 1550, label: "1.55 GHz" },
                      { value: 1600, label: "1.6 GHz" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          ),
        },
        {
          label: "Khác",
          key: "other",
          children: (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Số cổng</p>
                <Form.Item
                  name="specifications.ports"
                  rules={[
                    {
                      required: true,
                      message: "Số cổng không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} step={1} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Bàn phím</p>
                <Form.Item
                  name="specifications.keyboard"
                  rules={[
                    {
                      required: true,
                      message: "Bàn phím không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Touchpad</p>
                <Form.Item
                  name="specifications.touchpad"
                  rules={[
                    {
                      required: true,
                      message: "Touchpad không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: true, label: "Có" },
                      { value: false, label: "Không" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Webcam</p>
                <Form.Item
                  name="specifications.webcam"
                  rules={[
                    {
                      required: true,
                      message: "Webcam không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: true, label: "Có" },
                      { value: false, label: "Không" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Pin</p>
                <Form.Item
                  name="specifications.battery"
                  rules={[
                    {
                      required: true,
                      message: "Pin không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Khối lượng (Kg)</p>
                <Form.Item
                  name="specifications.weight"
                  rules={[
                    {
                      required: true,
                      message: "Khối lượng không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </div>

              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Hệ điều hành</p>
                <Form.Item
                  name="specifications.os"
                  rules={[
                    {
                      required: true,
                      message: "Hệ điều hành không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "windows", label: "Windows" },
                      { value: "macos", label: "Mac OS" },
                      { value: "chrome_os", label: "Chrome OS" },
                      { value: "linux", label: "Linux" },
                      { value: "unix", label: "Unix" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Bảo hành (tháng)</p>
                <Form.Item
                  name="specifications.warranty"
                  rules={[
                    {
                      required: true,
                      message: "Bảo hành không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <InputNumber min={0} step={1} className="w-full" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Màu sắc</p>
                <Form.Item
                  name="specifications.color"
                  rules={[
                    {
                      required: true,
                      message: "Màu sắc không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Select
                    showSearch={true}
                    filterOption={filterOption}
                    options={[
                      { value: "Bạc", label: "Bạc" },
                      { value: "Xám", label: "Xám" },
                      { value: "Đen", label: "Đen" },
                      { value: "Trắng", label: "Trắng" },
                      { value: "Vàng", label: "Vàng" },
                      { value: "Hồng vàng", label: "Hồng vàng" },
                      { value: "Đỏ", label: "Đỏ" },
                      { value: "Xanh da trời", label: "Xanh da trời" },
                      { value: "Hồng", label: "Hồng" },
                      { value: "Tím", label: "Tím" },
                      { value: "Xanh lá", label: "Xanh lá" },
                      { value: "Cam", label: "Cam" },
                      { value: "Đồng", label: "Đồng" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};

export function NewProductVariantForm({ onSuccess, onClose, productId }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      sku: values.SKU,
      image: values.image,
      cost_price: values.cost_price,
      standard_price: values.standard_price,
      discount: values.discount,
      tax_rate: values.tax_rate,
      extra_fee: values.extra_fee,
      state: values.state,
      specifications: {
        cpu: {
          name: values.specifications.cpu.name,
          cores: values.specifications.cpu.cores,
          threads: values.specifications.cpu.threads,
          base_clock: values.specifications.cpu.base_clock,
          turbo_clock: values.specifications.cpu.turbo_clock,
          cache: values.specifications.cpu.cache,
        },
        ram: {
          capacity: values.specifications.ram.capacity,
          type: values.specifications.ram.type,
          frequency: values.specifications.ram.frequency,
        },
        storage: {
          drive: values.specifications.storage.drive,
          capacity: values.specifications.storage.capacity,
          type: values.specifications.storage.type,
        },
        display: {
          technology: values.specifications.display.technology,
          refresh_rate: values.specifications.display.refresh_rate,
          touch: values.specifications.display.touch,
        },
        graphics: {
          name: values.specifications.gpu.name,
          memory: values.specifications.gpu.memory,
          type: values.specifications.gpu.type,
          frequency: values.specifications.gpu.frequency,
        },
        ports: values.specifications.ports,
        keyboard: values.specifications.keyboard,
        touchpad: values.specifications.touchpad,
        webcam: values.specifications.webcam,
        battery: values.specifications.battery,
        weight: values.specifications.weight,
        os: values.specifications.os,
        warranty: values.specifications.warranty,
        color: values.specifications.color,
      }
    }
    console.log(data);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (productId)
      form.setFieldsValue({
        product_id: productId,
      });
  }, [productId]);

  return (
    <Form
      name="new-product-variant-form"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
      initialValues={{
        tax_rate: 0.1,
        discount: 0,
        extra_fee: 0,
        standard_price: 0,
        cost_price: 0,
        state: PRODUCT_VARIANT_STATE.published,
      }}
    >
      <p className="m-0">Tên biến thể</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên biến thể!",
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" />
      </Form.Item>
      <p className="m-0">SKU</p>
      <Form.Item
        name="SKU"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập SKU hợp lệ!",
            pattern: /^[a-zA-Z0-9]+$/,
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" />
      </Form.Item>
      <p className="m-0">Link hình ảnh</p>
      <Form.Item
        name="image"
        rules={[
          {
            required: true,
            type: "url",
            message: "Giá trị không hợp lệ",
          },
        ]}
        className="m-0"
      >
        <Input className="w-full" />
      </Form.Item>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2 col-span-3">
          <p className="m-0">Giá vốn</p>
          <Form.Item
            name="cost_price"
            rules={[
              {
                required: true,
                message: "Giá vốn không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <InputNumber min={0} step={1} className="w-full" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 col-span-3">
          <p className="m-0">Giá tiêu chuẩn</p>
          <Form.Item
            name="standard_price"
            rules={[
              {
                required: true,
                message: "Giá tiêu chuẩn không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <InputNumber min={0} step={1} className="w-full" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <p className="m-0">Giảm giá</p>
          <Form.Item
            name="discount"
            rules={[
              {
                required: true,
                message: "Giá trị không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <InputNumber
              min={0}
              max={1}
              placeholder="0.01"
              className="w-full"
            />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <p className="m-0">Thuế</p>
          <Form.Item
            name="tax_rate"
            rules={[
              {
                required: true,
                message: "Giá trị thuế không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <InputNumber min={0} max={1} placeholder="0.1" className="w-full" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <p className="m-0">Phí</p>
          <Form.Item
            name="extra_fee"
            rules={[
              {
                required: true,
                message: "Phí không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>
      </div>

      <p className="m-0">Trạng thái</p>
      <Form.Item
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
      <div className="grid gap-0">
        <p className="m-0">Cấu hình</p>
        <SpecificationsFormItem />
      </div>

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
