import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";


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
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0002",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0003",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
  {
    customer_id: "0004",
    customer_name: "John Brown",
    customer_email: "johnbrown@gmail.com",
    customer_phone: "0901234567",
    customer_address: "New York No. 1 Lake Park",
    initial_date: "2021-10-10",
    status: "Đang hoạt động",
  },
];

export default function Customer() {
  return (
    <DefaultLayout>
      {/* //Search bar */}
      <div class="relative w-80 mb-7">
        <input
          class="border w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs font-bold focus:outline-none"
          type="search"
          name="search"
          placeholder="Tìm kiếm khách hàng"

        />

        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
          <AiOutlineSearch class="text-slate-400 text-lg" />
        </button>
      </div>

      {/* //Category */}
      <div class="block border px-10 py-10">
        <div class="inline-block w-full">
          <div class="float-left">
            <p>
              <span class="text-2xl font-bold mr-3">Khách hàng</span>
              <span class="font-bold text-slate-500	">Có 15 khách hàng</span>
            </p>
          </div>
          <div class="float-right">
            <DatePicker />
          </div>
        </div>

        <div>
          <Table dataSource={data} columns={columns} />
        </div>




      </div>
    </DefaultLayout>
  );
}
