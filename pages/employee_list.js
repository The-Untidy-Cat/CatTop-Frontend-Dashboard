import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import TableTemplate from "./table_template";
import { useState } from "react";
import { Modal } from "antd";

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
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm nhân viên"} action={action} />
 

    </DefaultLayout>
  );
}
