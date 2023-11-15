import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";


const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_id",
    key: "customer_id",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Giá sản phẩm",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
  },
];

const data = [
  {
    id: "1",
    order_id: "1",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    status: "Đã hoàn thành",
  },
  {
    id: "2",
    order_id: "2",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    status: "Đã hoàn thành",
  },
  {
    id: "3",
    order_id: "3",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    status: "Đang xử lý",
  },
  {
    id: "4",
    order_id: "4",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    status: "Đã huỷ",
  },
];



const table_template = () => {
  return (
    <Table dataSource={data} columns={columns} />
  );
}

const table_filter = (status) => {
  const result = data.filter((item) => item.status == status);
  return (
    <Table dataSource={result} columns={columns} />
  );
}

export default function Order() {
  const items = [
    {
      key: '1',
      label: 'Tất cả đơn hàng',
      children: table_template(),
    },
    {
      key: '2',
      label: 'Đã hoàn thành',
      children: table_filter("Đã hoàn thành"),
    },
    {
      key: '3',
      label: 'Đang giao hàng',
      children: table_filter("Đang xử lý"),
    },
    {
      key: '4',
      label: 'Đã hủy',
      children: table_filter("Đã huỷ"),
    },
  ];
  return (
    <DefaultLayout>
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Đơn hàng</span>
          <span class="font-bold text-slate-500	">15 đơn hàng được tìm thấy</span>
        </p>
      </div>


      {/* //Category */}
      <div class="block border px-10 py-10">
        {/* //Search bar */}
        <div class="inline-block w-full">
          <div class="relative float-left w-80 mb-5">
            <input
              class="border w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs focus:outline-none"
              type="search"
              name="search"
              placeholder="Tìm kiếm đơn hàng"
            />

            <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
              <AiOutlineSearch class="text-slate-400 text-lg" />
            </button>
          </div>
          <div class="float-right">
              <DatePicker />
            </div>
        </div>

        <div class="inline-block w-full">
            <button class="rounded-lg w-24 h-9 mr-7">
              <p>
                <span><FaPlus class ="text-white mr-2 w-2.5 align-middle	"/></span>
                <span class="text-white font-bold align-middle		">Thêm</span>
              </p>
            </button>

            <button class="rounded-lg w-24 h-9 bg-yellow-400">
              <p>
                <span><RiPencilFill class ="text-white mr-2 align-middle	"/></span>
                <span class="text-white font-bold align-middle		">Sửa</span>
              </p>
            </button>
        </div>

        <div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>




      </div>
    </DefaultLayout>
  );
}
