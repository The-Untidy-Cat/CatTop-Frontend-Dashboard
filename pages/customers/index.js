import DefaultLayout from "@/components/Layout";
import { DatePicker, Divider, Tabs, Pagination, Table, Form, Input, Button } from "antd";
import TableView from "../../components/View/table";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { NewCustomerForm } from "@/components/Form/customers";

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


const actions = [
  {
      key: "add",
      buttonLabel: <span className="text-white font-bold align-middle	">Thêm</span>,
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
      buttonLabel: <span className="font-bold align-middle	">Sửa</span>,
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
  const router = useRouter();
  const onSelectedRow = (data) => {
    router.push("/customers/" + data.customer_id);
  }
  return (
    <DefaultLayout>
      <div className="float-left">
        <p>
          <span className="text-2xl font-bold mr-3">Khách hàng</span>
          <span className="font-bold text-slate-500">15 khách hàng được tìm thấy</span>
        </p>
      </div>
      <TableView data={data} columns={columns} title={"Tìm kiếm khách hàng"} actions={actions} onSelectedRow={onSelectedRow}/>
   

    </DefaultLayout>
  );
}
