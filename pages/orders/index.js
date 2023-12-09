import DefaultLayout from "@/components/Layout";
// import {
//   DatePicker,
//   Divider,
//   Tabs,
//   Pagination,
//   Table,
//   Form,
//   Input,
//   Button,
// } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import TableView from "../../components/View/table";
import { useRouter } from "next/router";
import NewOrderForm from "@/components/Form/orders";
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "payment_state",
    key: "payment_state",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Tình trạng",
    dataIndex: "state",
    key: "state",
  },
];

export default function Order() {
  const router = useRouter();
  const limit = 5;
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Order",
        domain: keyword ? [["id", "like", `%${keyword}%`]] : [],
        fields: ["id","payment_state","customer_id","payment_method","created_at","state","employee_id"],
        limit,
        offset,
        relation: ["customer","employee"],
      });
      console.log(response)
      setOrders(response?.records)
      // setOrders(response?.records?.map((item) => ({ ...item, key: item.id })));
      setLength(response?.length);
      setOffset(response?.offset);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  const listOrders = [
  ]
  const formatDataOrders = orders?.map((item) => {
        const time = new Date(item.created_at);
        const date = time.getDate()
        const month = time.getMonth() + 1
        const year = time.getFullYear()
        let order =
          {
            order_id: item.id,
            customer_name: item.customer.last_name + " " +item.customer.first_name,
            employee_name: item.employee ? item.customer.last_name + " " +item.customer.first_name : "Không có",
            payment_state: item.payment_state === "unpaid" ? "Chưa thanh toán" : "Đã thanh toán",
            created_at: date + "-" + month + "-" + year,
            state: item.state
          }
          listOrders.push(order)
    })

  const onSearch = (value) => {
    setKeyword(value);
  };

  const onPaginationChange = (page, pageSize) => {
    setOffset((page - 1) * pageSize);
  };

  const onSelectedRow = (data) => {
    router.push("/orders/" + data.id);
  };

  useEffect(() => {
    getData();
    formatDataOrders;
  }, [keyword, offset]);

  const actions = [
    {
      key: "add",
      buttonLabel: (
        <span className="text-white font-bold align-middle	">Thêm</span>
      ),
      buttonType: "primary",
      buttonIcon: (
        <span>
          <FaPlus className="text-white mr-2 w-2.5 align-middle" />
        </span>
      ),
      title: "Thêm mới",
      children: <NewOrderForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];
  return (
    <DefaultLayout
      title={"Đơn hàng"}
      breadcrumb={[
        {
          href: "/orders",
          title: "Đơn hàng",
        },
      ]}
    >
      <TableView
        title="Đơn hàng"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: listOrders,
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
