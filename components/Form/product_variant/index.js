import { PRODUCT_VARIANT_STATE } from "@/app.config";
import {
  createProductVariant,
  getProductVariant,
  updateProductVariant,
} from "@/services/product_variant";
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
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";
import TableView from "@/components/View/table";

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
                <p className="m-0">Loại ổ cứng</p>
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
                      { value: "HDD", label: "HDD" },
                      { value: "SSD", label: "SSD" },
                      { value: "SSHD", label: "SSHD" },
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
                <p className="m-0">Loại giao tiếp</p>
                <Form.Item
                  name="specifications.storage.type"
                  rules={[
                    {
                      required: true,
                      message: "Loại giao tiếp không hợp lệ!",
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
                <p className="m-0">Độ phân giải</p>
                <Form.Item
                  name="specifications.display.size"
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
                      { value: "HD", label: "HD" },
                      { value: "HD+", label: "HD+" },
                      { value: "Full HD", label: "Full HD" },
                      { value: "QHD", label: "QHD" },
                      { value: "UHD", label: "UHD" },
                      { value: "4K", label: "4K" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Kích thước điểm ảnh</p>
                <Form.Item
                  name="specifications.display.resolution"
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
                      { value: "1366x768", label: "1366x768" },
                      { value: "1600x900", label: "1600x900" },
                      { value: "1920x1080", label: "1920x1080" },
                      { value: "2560x1440", label: "2560x1440" },
                      { value: "3840x2160", label: "3840x2160" },
                      { value: "7680x4320", label: "7680x4320" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Công nghệ</p>
                <Form.Item
                  name="specifications.display.technology"
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
                  name="specifications.display.refresh_rate"
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
                  name="specifications.display.touch"
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
                  name="specifications.gpu.name"
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
                  name="specifications.gpu.memory"
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
                <p className="m-0">Loại</p>
                <Form.Item
                  name="specifications.gpu.type"
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
                      { value: "Dedicated", label: "Card rời" },
                      { value: "Integrated", label: "Tích hợp" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <p className="m-0">Tần số</p>
                <Form.Item
                  name="specifications.gpu.frequency"
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
                <p className="m-0">Cổng kết nối</p>
                <Form.Item
                  name="specifications.ports"
                  rules={[
                    {
                      required: true,
                      message: "Cổng kết nối không hợp lệ!",
                    },
                  ]}
                  className="m-0"
                >
                  <Input className="w-full" />
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

function ProductVariantForm({
  handleSubmit,
  data,
  loading,
  disabled,
  formRef,
}) {
  const [form] = formRef ?? Form.useForm();
  const loadData = async () => {
    if (!data) return;
    const fields = {
      ...data,
      "specifications.cpu.name": data?.specifications?.cpu?.name ?? null,
      "specifications.cpu.cores": data?.specifications?.cpu?.cores ?? null,
      "specifications.cpu.threads": data?.specifications?.cpu?.threads ?? null,
      "specifications.cpu.base_clock":
        data?.specifications?.cpu?.base_clock ?? null,
      "specifications.cpu.turbo_clock":
        data?.specifications?.cpu?.turbo_clock ?? null,
      "specifications.cpu.cache": data?.specifications?.cpu?.cache ?? null,
      "specifications.ram.type": data?.specifications?.ram?.type ?? null,
      "specifications.ram.capacity":
        data?.specifications?.ram?.capacity ?? null,
      "specifications.ram.frequency":
        data?.specifications?.ram?.frequency ?? null,
      "specifications.storage.drive":
        data?.specifications?.storage?.drive ?? null,
      "specifications.storage.capacity":
        data?.specifications?.storage?.capacity ?? null,
      "specifications.storage.type":
        data?.specifications?.storage?.type ?? null,
      "specifications.display.size":
        data?.specifications?.display?.size ?? null,
      "specifications.display.resolution":
        data?.specifications?.display?.resolution ?? null,
      "specifications.display.refresh_rate":
        data?.specifications?.display?.refresh_rate ?? null,
      "specifications.display.technology":
        data?.specifications?.display?.technology ?? null,
      "specifications.display.touch":
        data?.specifications?.display?.touch ?? null,
      "specifications.gpu.name": data?.specifications?.gpu?.name ?? null,
      "specifications.gpu.memory": data?.specifications?.gpu?.memory ?? null,
      "specifications.gpu.frequency":
        data?.specifications?.gpu?.frequency ?? null,
      "specifications.gpu.type": data?.specifications?.gpu?.type ?? null,
      "specifications.ports": data?.specifications?.ports ?? null,
      "specifications.keyboard": data?.specifications?.keyboard ?? null,
      "specifications.touchpad": data?.specifications?.touchpad ?? null,
      "specifications.webcam": data?.specifications?.webcam ?? null,
      "specifications.battery": data?.specifications?.battery ?? null,
      "specifications.weight": data?.specifications?.weight ?? null,
      "specifications.warranty": data?.specifications?.warranty ?? null,
      "specifications.os": data?.specifications?.os ?? null,
      "specifications.color": data?.specifications?.color ?? null,
    };
    form.setFieldsValue(fields);
  };
  useEffect(() => {
    loadData();
  }, [data]);

  return (
    <Form
      name={`product-variant-form-${Math.random(1000, 9999)}`}
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={disabled || loading}
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
            pattern: /^[a-zA-Z0-9-]+$/,
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
            <InputNumber
              min={0}
              step={1}
              className="w-full"
              decimalSeparator=","
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\.\s?|(,*)/g, "")}
            />
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
            <InputNumber
              min={0}
              step={1}
              className="w-full"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\.\s?|(,*)/g, "")}
            />
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
              prefix="%"
              formatter={(value) => `${value * 100}`}
              parser={(value) => value / 100}
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
            <InputNumber
              min={0}
              max={1}
              placeholder="0.1"
              className="w-full"
              prefix="%"
              formatter={(value) => `${value * 100}`}
              parser={(value) => value / 100}
            />
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
            <InputNumber
              min={0}
              className="w-full"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\.\s?|(,*)/g, "")}
            />
          </Form.Item>
        </div>
      </div>

      <p className="m-0">Trạng thái</p>
      <Form.Item
        name="state"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn trạng thái!",
          },
        ]}
        className="m-0"
      >
        <Select
          options={Object.keys(PRODUCT_VARIANT_STATE).map((key) => ({
            value: key,
            label: PRODUCT_VARIANT_STATE[key],
          }))}
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
          hidden={disabled}
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function NewProductVariantForm({
  onSuccess,
  onClose,
  productId,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    if (!productId)
      return notification.error({
        message: "Lỗi",
        description: "Không tìm thấy mã sản phẩm!",
      });
    const data = {
      name: values.name,
      SKU: values.SKU,
      image: values.image,
      cost_price: values.cost_price,
      standard_price: values.standard_price,
      discount: values.discount,
      description: "Không có thông tin",
      tax_rate: values.tax_rate,
      extra_fee: values.extra_fee,
      state: values.state,
      specifications: {
        cpu: {
          name: values[`specifications.cpu.name`],
          cores: values[`specifications.cpu.cores`],
          threads: values[`specifications.cpu.threads`],
          base_clock: values[`specifications.cpu.base_clock`],
          turbo_clock: values[`specifications.cpu.turbo_clock`],
          cache: values[`specifications.cpu.cache`],
        },
        ram: {
          capacity: values[`specifications.ram.capacity`],
          type: values[`specifications.ram.type`],
          frequency: values[`specifications.ram.frequency`],
        },
        storage: {
          drive: values[`specifications.storage.drive`],
          capacity: values[`specifications.storage.capacity`],
          type: values[`specifications.storage.type`],
        },
        display: {
          size: values[`specifications.display.size`],
          resolution: values[`specifications.display.resolution`],
          technology: values[`specifications.display.technology`],
          refresh_rate: values[`specifications.display.refresh_rate`],
          touch: values[`specifications.display.touch`],
        },
        gpu: {
          name: values[`specifications.gpu.name`],
          memory: values[`specifications.gpu.memory`],
          type: values[`specifications.gpu.type`],
          frequency: values[`specifications.gpu.frequency`],
        },
        ports: values[`specifications.ports`],
        keyboard: values[`specifications.keyboard`],
        touchpad: values[`specifications.touchpad`],
        webcam: values[`specifications.webcam`],
        battery: values[`specifications.battery`],
        weight: values[`specifications.weight`],
        os: values[`specifications.os`],
        warranty: values[`specifications.warranty`],
        color: values[`specifications.color`],
      },
    };
    setLoading(true);
    createProductVariant({ data, productId })
      .then((res) => {
        onSuccess && onSuccess();
        notification.success({
          message: "Thành công",
          description: "Tạo biến thể sản phẩm thành công!",
        });
        onClose && onClose();
      })
      .catch((err) => {
        if (err?.response?.data?.errors) {
          Object.keys(err.response.data.errors).forEach((key) => {
            form.setFields([
              {
                name: key,
                errors: [err.response.data.errors[key]],
              },
            ]);
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra!",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ProductVariantForm
      handleSubmit={handleSubmit}
      loading={loading}
      formRef={[form]}
    />
  );
}

export function EditProductVariantForm({
  onSuccess,
  onClose,
  productId,
  variantId,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState(null);

  const handleSubmit = async (values) => {
    if (!productId)
      return notification.error({
        message: "Lỗi",
        description: "Không tìm thấy mã sản phẩm!",
      });
    const specifications = {
      cpu: {
        name: values[`specifications.cpu.name`],
        cores: values[`specifications.cpu.cores`],
        threads: values[`specifications.cpu.threads`],
        base_clock: values[`specifications.cpu.base_clock`],
        turbo_clock: values[`specifications.cpu.turbo_clock`],
        cache: values[`specifications.cpu.cache`],
      },
      ram: {
        capacity: values[`specifications.ram.capacity`],
        type: values[`specifications.ram.type`],
        frequency: values[`specifications.ram.frequency`],
      },
      storage: {
        drive: values[`specifications.storage.drive`],
        capacity: values[`specifications.storage.capacity`],
        type: values[`specifications.storage.type`],
      },
      display: {
        size: values[`specifications.display.size`],
        resolution: values[`specifications.display.resolution`],
        technology: values[`specifications.display.technology`],
        refresh_rate: values[`specifications.display.refresh_rate`],
        touch: values[`specifications.display.touch`],
      },
      gpu: {
        name: values[`specifications.gpu.name`],
        memory: values[`specifications.gpu.memory`],
        type: values[`specifications.gpu.type`],
        frequency: values[`specifications.gpu.frequency`],
      },
      ports: values[`specifications.ports`],
      keyboard: values[`specifications.keyboard`],
      touchpad: values[`specifications.touchpad`],
      webcam: values[`specifications.webcam`],
      battery: values[`specifications.battery`],
      weight: values[`specifications.weight`],
      os: values[`specifications.os`],
      warranty: values[`specifications.warranty`],
      color: values[`specifications.color`],
    };
    const formData = {
      name: data?.name != values.name ? values.name : undefined,
      SKU: data?.SKU != values.SKU ? values.SKU : undefined,
      image: data?.image != values.image ? values.image : undefined,
      cost_price:
        data?.cost_price != values.cost_price ? values.cost_price : undefined,
      standard_price:
        data?.standard_price != values.standard_price
          ? values.standard_price
          : undefined,
      discount: data?.discount != values.discount ? values.discount : undefined,
      description: "Không có thông tin",
      tax_rate: data?.tax_rate != values.tax_rate ? values.tax_rate : undefined,
      extra_fee:
        data?.extra_fee != values.extra_fee ? values.extra_fee : undefined,
      state: data?.state != values.state ? values.state : undefined,
      specifications:
        data?.specifications != specifications ? specifications : undefined,
    };
    setLoading(true);
    updateProductVariant({
      data: formData,
      productId: productId,
      variantId: variantId,
    })
      .then((res) => {
        onSuccess && onSuccess();
        notification.success({
          message: "Thành công",
          description: "Cập nhật biến thể sản phẩm thành công!",
        });
        onClose && onClose();
      })
      .catch((err) => {
        if (err?.response?.data?.errors) {
          Object.keys(err.response.data.errors).forEach((key) => {
            form.setFields([
              {
                name: key,
                errors: [err.response.data.errors[key]],
              },
            ]);
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra!",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadVariant = async () => {
    setLoading(true);
    getProductVariant({ productId, variantId })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notification.error({
          message: "Lỗi",
          description: "Có lỗi xảy ra!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!productId || !variantId) return;
    loadVariant();
  }, []);
  return (
    <>
      <Button
        type="link"
        onClick={() => setDisabled(!disabled)}
        className="p-0 float-right"
      >
        {disabled ? "Chỉnh sửa" : "Hủy"}
      </Button>
      <ProductVariantForm
        formRef={[form]}
        handleSubmit={handleSubmit}
        loading={loading}
        data={data}
        disabled={disabled}
      />
    </>
  );
}

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "SKU",
    dataIndex: "SKU",
    key: "email",
  },
];

const filterOptions = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "Tên biến thể",
    value: "name",
  },
  {
    label: "SKU",
    value: "SKU",
  },
];

export function SearchProductVariant({ onSuccess, onClose }) {
  const limit = 5;
  const [variants, setVariants] = useState([]);
  const [filter, setFilter] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "ProductVariant",
        domain: keyword ? [[filter, "like", `%${keyword}%`]] : [],
        fields: [
          "id",
          "name",
          "image",
          "SKU",
          "sale_price",
          "product_id"
        ],
        limit,
        offset,
        relation: ["product:id,name"]
      });
      setVariants(
        response?.records.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
      setLength(response?.length);
      setOffset(response?.offset);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  const onSearch = (value) => {
    setKeyword(value);
  };

  const onPaginationChange = (page, pageSize) => {
    setOffset((page - 1) * pageSize);
  };
  const onSelectedRow = (data) => {
    onSuccess && onSuccess(data);
    onClose && onClose();
  };

  useEffect(() => {
    getData();
  }, [keyword, offset]);

  return (
    <TableView
      title="Danh sách biến thể"
      filter={{
        show: true,
        options: filterOptions,
        onChange: (value) => setFilter(value),
      }}
      table={{
        bordered: true,
        loading: loading,
        data: variants,
        columns: columns,
        onSelectedRow: onSelectedRow,
      }}
      search={{
        show: true,
        placeholder: "Tìm kiếm",
        onSearch: onSearch,
      }}
      pagination={{
        length,
        pageSize: limit,
        current: offset / limit + 1,
        onChange: onPaginationChange,
      }}
    />
  );
}
// export  NewProductVariantForm;
