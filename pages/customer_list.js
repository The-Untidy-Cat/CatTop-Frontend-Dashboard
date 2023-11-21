import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Form, Input, Button } from "antd";
import TableTemplate from "./table_template";
import { useState } from "react";
import { Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const columns = [
  {
    title: "Mã khách hàng",
    dataIndex: "customer_id",
    key: "customer_id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Email",
    dataIndex: "customer_email",
    key: "customer_email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "customer_phone",
    key: "customer_phone",
  },
  {
    title: "Địa chỉ",
    dataIndex: "customer_address",
    key: "customer_address",
  },
  {
    title: "Ngày khởi tạo",
    dataIndex: "initial_date",
    key: "initial_date",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

const data = [
  {
    customer_id: "0001",
    customer_name: <a>John Brown</a>,
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0002",
    customer_name: <a>John Brown</a>,
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0003",
    customer_name: <a>John Brown</a>,
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0004",
    customer_name: <a>John Brown</a>,
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
];

const NewCustomerForm = () => {
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
          <p className="m-0">Địa chỉ</p>
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

const actions = [
  {
      key: "add",
      buttonLabel: <span class="text-white font-bold align-middle	">Thêm</span>,
      buttonType: "primary",
      buttonIcon: <span><FaPlus class ="text-white mr-2 w-2.5 align-middle"/></span>,
      title: "Thêm mới",
      children: <NewCustomerForm />,
      modalProps: {
          centered: true,
      },
  },
  {
      key: "edit",
      buttonLabel: <span class="font-bold align-middle	">Sửa</span>,
      buttonType: "default",
      buttonIcon: <RiPencilFill class ="mr-2 w-2.5 align-middle"/>,
      title: "Sửa",
      children: <NewCustomerForm />,
      modalProps: {
          centered: true,
      },
  },
];

export default function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const action = [
    {
      text: "Thêm mới",
      icon: <AiOutlineSearch />,
      onClick: () => {
        Modal.info({
          title: "test",
          content: "test"
        })
      }
    }
  ]
  return (
    <DefaultLayout>
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Khách hàng</span>
          <span class="font-bold text-slate-500">15 khách hàng được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm khách hàng"} actions={actions} />
   

    </DefaultLayout>
  );
}
