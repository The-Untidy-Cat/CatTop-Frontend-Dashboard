import { Button, Form, Input, Select } from "antd";

export function ReturnForm() {
  return (
    <Form
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    >
      <p>Mã sản phẩm</p>
      <Form.Item
        name="id"
        className="m-0"
        rules={[
          {
            required: true,
            pattern: /^[0-9\b]+$/,
            message: "Mã sản phẩm không hợp lệ",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <p>Mã khách hàng</p>
      <Form.Item
        name="cst_id"
        className="m-0"
        rules={[
          {
            required: true,
            pattern: /^[0-9\b]+$/,
            message: "Mã khách hàng không hợp lệ",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <p>Lý do đổi trả</p>
      <Form.Item
        name="reason"
        className="m-0"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập lý do đổi trả',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <p>Loại đổi trả</p>
      <Form.Item
        name="type"
        className="m-0"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn loại đổi trả",
          },
        ]}
      >
        <Select placeholder="Chọn loại đổi trả">
          <Option value="exchange">Thay sản phẩm mới</Option>
          <Option value="refund">Hoàn tiền</Option>
        </Select>
      </Form.Item>
      <Form.Item className="m-0 mt-3">
        <Button
          className="w-full bg-primary text-white"
          htmlType="submit"
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ReturnForm;
