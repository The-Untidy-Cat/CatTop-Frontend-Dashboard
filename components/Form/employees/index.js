import { createEmployee, updateEmployee } from "@/services/employee";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function NewEmployeeForm({ data, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createEmployee({
      ...values,
      gender: Number(values.gender),
      date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
      view_on_create: undefined,
    })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/customers/${res.id}`);
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
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Họ</p>
          <Form.Item
            name="last_name"
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
          <p className="m-0">Tên</p>
          <Form.Item
            name="first_name"
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

      <p className="m-0">Email</p>
      <Form.Item
        label=""
        name="email"
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

      <p className="m-0">Số điện thoại</p>
      <Form.Item
        name="phone_number"
        rules={[
          {
            required: true,
            type: "phone",
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Cơ sở làm việc</p>
      <Form.Item
        name="department"
        rules={[
          {
            required: false,
            pattern:
              /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
            message: "Cơ sở làm việc không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Chức vụ</p>
      <Form.Item
        name="position"
        rules={[
          {
            required: false,
            pattern:
              /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
            message: "Chức vụ không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
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

export function EditEmployeeForm({ data, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    updateEmployee(data?.id, {
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
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
            message: "Cập nhật nhân viên thất bại",
            description: err.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });

    useEffect(() => {
      form.setFieldsValue(data);
    }, [data]);
    
    return (
      <Form
        name="registration"
        onFinish={handleSubmit}
        autoComplete="off"
        className="flex flex-col w-full gap-2"
      >
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-2 w-1/3">
            <p className="m-0">Họ</p>
            <Form.Item
              name="last_name"
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
            <p className="m-0">Tên</p>
            <Form.Item
              name="first_name"
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

        <p className="m-0">Email</p>
        <Form.Item
          label=""
          name="email"
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

        <p className="m-0">Số điện thoại</p>
        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              type: "phone",
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
        <p className="m-0">Cơ sở làm việc</p>
        <Form.Item
          name="department"
          rules={[
            {
              required: false,
              pattern:
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
              message: "Cơ sở làm việc không hợp lệ!",
            },
          ]}
          className="m-0"
        >
          <Input />
        </Form.Item>
        <p className="m-0">Chức vụ</p>
        <Form.Item
          name="position"
          rules={[
            {
              required: false,
              pattern:
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
              message: "Chức vụ không hợp lệ!",
            },
          ]}
          className="m-0"
        >
          <Input />
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
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
}

export default NewEmployeeForm;
