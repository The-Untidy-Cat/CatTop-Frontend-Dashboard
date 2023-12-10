import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import {
  DatePicker,
  Divider,
  Tabs,
  Pagination,
  Table,
  Form,
  Input,
  Button,
} from "antd";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { NewEmployeeForm } from "@/components/Form/employees";
import { searchRead } from "@/services/search_read";
const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên nhân viên",
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
    title: "Cơ sở làm việc",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

export default function employeeList() {
  const router = useRouter();
  const limit = 5;
  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Employee",
        domain: keyword ? [["name", "=", keyword]] : [],
        fields: [
          "id",
          "first_name",
          "last_name",
          "state",
          "email",
          "phone_number",
          "job_title",
          "department",
        ],
        limit,
        offset,
      });
      setEmployees(
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
    router.push(`/employees/${data.id}`);
  };

  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <NewEmployeeForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [keyword, offset]);

  return (
    <DefaultLayout
      title={"Nhân viên"}
      breadcrumb={[
        {
          href: "/employees",
          title: "Nhân viên",
        },
      ]}
    >
      <TableView
        title="Danh sách nhân viên"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: employees,
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
    </DefaultLayout>
  );
}
