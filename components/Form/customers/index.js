import { CUSTOMER_GENDER, CUSTOMER_STATE } from "@/app.config";
import { createCustomer, updateCustomer } from "@/services/customer";
import { Button, Checkbox, DatePicker, Form, Input, Select, notification } from "antd";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";
import dayjs from "dayjs";
import TableView from "@/components/View/table";

export function EditCustomerForm({ data, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    updateCustomer(data?.id, {
      ...values,
      email: values.email != data?.email ? values.email : undefined,
      date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
      date_of_birth:
        values.date_of_birth != data?.date_of_birth
          ? values.date_of_birth
          : undefined,
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
            message: "Cập nhật khách hàng thất bại",
            description: err.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
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

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Số điện thoại</p>
          <Form.Item
            label=""
            name="phone_number"
            rules={[
              {
                required: true,
                pattern:
                  /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Ngày sinh</p>
          <Form.Item
            label=""
            name="date_of_birth"
            rules={[
              {
                required: true,
                type: "date",
                message: "Ngày sinh không không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giới tính</p>
          <Form.Item
            label=""
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính!",
              },
            ]}
            className="m-0"
          >
            <Select
              options={Object.keys(CUSTOMER_GENDER).map((key) => ({
                label: CUSTOMER_GENDER[key],
                value: key,
              }))}
              className="w-full"
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
            message: "Vui lòng nhập trạng thái!",
          },
        ]}
        className="m-0"
      >
        <Select
          options={Object.keys(CUSTOMER_STATE).map((key) => ({
            label: CUSTOMER_STATE[key],
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
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export function NewCustomerForm({ onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    // console.log(values);
    createCustomer({
      ...values,
      gender: Number(values.gender),
      date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
      view_on_create: undefined,
    })
      .then((res) => {
        form.resetFields();
        if (values.view_on_create) {
          router.push(`/customers/${res.id}`);
        } else {
          onSuccess && onSuccess();
          form.resetFields();
          onClose && onClose();
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

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Số điện thoại</p>
          <Form.Item
            label=""
            name="phone_number"
            rules={[
              {
                required: true,
                pattern:
                  /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Ngày sinh</p>
          <Form.Item
            label=""
            name="date_of_birth"
            rules={[
              {
                required: true,
                type: "date",
                message: "Ngày sinh không không hợp lệ!",
              },
            ]}
            className="m-0"
          >
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="m-0">Giới tính</p>
          <Form.Item
            label=""
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính!",
              },
            ]}
            className="m-0"
          >
            <Select
              options={Object.keys(CUSTOMER_GENDER).map((key) => ({
                label: CUSTOMER_GENDER[key],
                value: key,
              }))}
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>

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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      return <>{record.first_name + " " + record.last_name}</>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Đã đặt",
    dataIndex: "order_count",
    key: "order_count",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

const filterOptions = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "Tên khách hàng",
    value: "first_name",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Số điện thoại",
    value: "phone_number",
  },
];

export function SearchCustomer({ onSuccess, onClose }) {
  const router = useRouter();
  const limit = 5;
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Customer",
        domain: keyword ? [[filter, "like", `%${keyword}%`]] : [],
        fields: [
          "id",
          "first_name",
          "last_name",
          "state",
          "email",
          "phone_number",
        ],
        limit,
        offset,
      });
      setCustomers(
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

  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <NewCustomerForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [keyword, offset]);

  return (
      <TableView
        title="Danh sách khách hàng"
        actions={actions}
        filter={{
          show: true,
          options: filterOptions,
          onChange: (value) => setFilter(value),
        }}
        table={{
          bordered: true,
          loading: loading,
          data: customers,
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

export default NewCustomerForm;
