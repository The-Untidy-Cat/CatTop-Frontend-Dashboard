export function NewBrandForm() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
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
        label=""
        name="brand_name"
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
      <Form.Item className="m-0 mt-2">
        <Button className="w-full bg-primary text-white" htmlType="submit">
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewBrandForm;
