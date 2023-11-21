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
    title: "Mã nhân viên",
    dataIndex: "employee_id",
    key: "employee_id",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Email",
    dataIndex: "employee_email",
    key: "employee_email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "employee_phone",
    key: "employee_phone",
  },
  {
    title: "Cơ sở làm việc",
    dataIndex: "employee_department",
    key: "employee_department",
  },
  {
    title: "Chức vụ",
    dataIndex: "employee_position",
    key: "employee_position",
  },
  {
    title: "Ngày khởi tạo",
    dataIndex: "initial_date",
    key: "initial_date",
  },
  {
    title: "Trạng thái",
    dataIndex: "employee_status",
    key: "employee_status",
  },
];

const data = [
  {
    employee_id: "0001",
    employee_name: <a>John Brown</a>,
    employee_email: "johnbrown@gmail.com",
    employee_phone: "0901234567",
    employee_department: "New York No. 1 Lake Park",
    employee_position: "Nhân viên",
    initial_date: "2021-10-10",
    employee_status: "Đang hoạt động",
  },
  {
    employee_id: "0002",
    employee_name: <a>John Brown</a>,
    employee_email: "johnbrown@gmail.com",
    employee_phone: "0901234567",
    employee_department: "New York No. 1 Lake Park",
    employee_position: "Quản lý",
    initial_date: "2021-10-10",
    employee_status: "Đang hoạt động",
  },
  {
    employee_id: "0003",
    employee_name: <a>John Brown</a>,
    employee_email: "johnbrown@gmail.com",
    employee_phone: "0901234567",
    employee_department: "New York No. 1 Lake Park",
    employee_position: "Nhân viên",
    initial_date: "2021-10-10",
    employee_status: "Đang hoạt động",
  },
  {
    employee_id: "0004",
    employee_name: <a>John Brown</a>,
    employee_email: "johnbrown@gmail.com",
    employee_phone: "0901234567",
    employee_department: "New York No. 1 Lake Park",
    employee_position: "Nhân viên",
    initial_date: "2021-10-10",
    employee_status: "Đang hoạt động",
  },
];

const NewEmployeeForm = () => {
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
          <p className="m-0">Tên nhân viên</p>
          <Form.Item
            name="employee_name"
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
          <p className="m-0">Email</p>
          <Form.Item
            name="employee_email"
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

      <p className="m-0">Số điện thoại</p>
      <Form.Item
        label=""
        name="employee_phone"
        rules={[
          {
            required: true,
            type: "employee_phone",
            message: "Email không hợp lệ!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Cơ sở làm việc</p>
      <Form.Item
        label=""
        name="employee_department"
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
      <p className="m-0">Chức vụ</p>
      <Form.Item
        label=""
        name="employee_position"
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
          Hoàn thành
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
      children: <NewEmployeeForm />,
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
      children: <NewEmployeeForm />,
      modalProps: {
          centered: true,
      },
  },
];

export default function employeeList() {
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
          <span class="text-2xl font-bold mr-3">Nhân viên</span>
          <span class="font-bold text-slate-500">15 nhân viên được tìm thấy</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm nhân viên"} actions={actions} />
 

    </DefaultLayout>
  );
}
