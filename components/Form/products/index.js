const NewProductForm = () => {
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
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-2 w-1/3">
            <p className="m-0">Mã sản phẩm</p>
            <Form.Item
              name="product_id"
              rules={[
                {
                  required: true,
                  pattern:
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
                  message: "Không hợp lệ",
                },
              ]}
              className="m-0"
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <p className="m-0">Tên sản phẩm</p>
            <Form.Item
              name="product_name"
              rules={[
                {
                  required: true,
                  pattern:
                    /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                  message: "Không hợp lệ",
                },
              ]}
              className="m-0"
            >
              <Input />
            </Form.Item>
          </div>
        </div>
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
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
        <p className="m-0">Giá</p>
        <Form.Item
          label=""
          name="product_price"
          rules={[
            {
              required: true,
              pattern:
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export { NewProductForm}