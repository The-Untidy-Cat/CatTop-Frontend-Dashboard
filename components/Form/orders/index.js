import { Form } from "antd";

const { useRouter } = require("next/router");
const { useState } = require("react");

const NewOrderForm = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createBrand({ ...values, view_on_create: undefined })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/orders/${res.id}`);
        } else {
          onSuccess && onSuccess();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Tên sản phẩm</p>
          <Form.Item
            name="order_product_name"
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
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Mã khách hàng</p>
          <Form.Item
            name="order_customer"
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

      <p className="m-0">Địa chỉ</p>
      <Form.Item
        
        name="order_address"
        rules={[
          {
            required: true,
            type: "order_phone",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Giá</p>
          <Form.Item
            name="order_price"
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
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Ngày đặt hàng</p>
          <Form.Item
            name="order_date"
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
            <DatePicker />
          </Form.Item>
        </div>
      </div>
      {/* <p className="m-0">Tên đăng nhập</p>
        <Form.Item
          
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

export default NewOrderForm;