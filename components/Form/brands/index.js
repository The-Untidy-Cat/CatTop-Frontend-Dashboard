const NewBrandForm = () => {
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
          label=""
          name="brand_name"
          rules={[
            {
              required: true,
              type: "brand_name",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
  
        <p className="m-0">Mô tả</p>
        <Form.Item
          label=""
          name="brand_name"
          rules={[
            {
              required: true,
              type: "brand_state",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
        {/* <p className="m-0">Tên đăng nhập</p>
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              pattern: /^[a-zA-Z0-9.\S]+$/,
              message: "Chỉ nhập chữ, số và dấu chấm!",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
        <p className="m-0">Mật khẩu</p>
        <Form.Item
          label=""
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập Mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
          className="m-0"
        >
          <Input.Password />
        </Form.Item> */}
        <Form.Item className="m-0 mt-2">
          <Button type="primary" className="w-full" htmlType="submit">
            Hoàn thành
          </Button>
        </Form.Item>
      </Form>
    );
  };

export { NewBrandForm}