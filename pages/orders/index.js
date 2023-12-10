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
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";
import { api } from "@/utils/axios";
import { getAllOrder, getUnlimitAllOrder } from "@/services/order";
import { ORDER_STATE, PAYMENT_STATE } from "@/app.config";
import { Tabs } from "antd";
import dayjs from "dayjs";
import NewOrderForm from "@/components/Form/orders";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (_, record) => {
      return <>{record.customer?.first_name}</>;
    },
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
    render: (_, record) => {
      return <>{record.employee?.first_name || "Không có"}</>;
    },
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "payment_state",
    key: "payment_state",
    render: (text) => PAYMENT_STATE[text],
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => {
      return <>{new Date(text).toLocaleString()}</>;
    },
  },
  {
    title: "Tình trạng",
    dataIndex: "state",
    key: "state",
    render: (text) => ORDER_STATE[text],
  },
];

const filterOptions = [
  {
    label: "ID",
    value: "orders.id",
  },
  {
    label: "Tên khách hàng",
    value: "customers.first_name",
  },
  {
    label: "Tên nhân viên",
    value: "employees.first_name",
  },
  {
    label: "Trạng thái thanh toán",
    value: "payment_state",
  },
  {
    label: "Ngày đặt hàng",
    value: "orders.created_at",
  },
  {
    label: "SĐT khách hàng",
    value: "customers.phone_number",
  },
];

export default function Order() {
  const router = useRouter();
  const limit = 10;
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [filter, setFilter] = useState(null);
  const [state, setState] = useState("pending");
  const [date, setDate] = useState(null); // [start, end]
  // [key, value
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const domain = [];
    if (state !== "all") {
      domain.push(["orders.state", "=", state]);
    }
    if (keyword) {
      domain.push([filter, "like", `%${keyword}%`]);
    }
    if (date) {
      domain.push([
        "orders.created_at",
        ">=",
        dayjs(date[0]).startOf("day").toISOString(),
      ]);
      domain.push([
        "orders.created_at",
        "<=",
        dayjs(date[1]).endOf("day").toISOString(),
      ]);
    }
    searchRead({
      model: "Order",
      fields: [
        "orders.id",
        "customer_id",
        "employee_id",
        "payment_state",
        "orders.state",
        "orders.created_at",
      ],
      domain: domain,
      relation: [
        "customer:id,first_name,last_name",
        "employee:id,first_name,last_name",
        "items:order_id,variant_id,amount,sale_price",
        "items.variant.product:id,name",
      ],
      joins: [
        ["customers", "orders.customer_id", "=", "customers.id"],
        ["employees", "orders.employee_id", "=", "employees.id"],
        // ["product_variants", "items.variant_id", "=", "product_variants.id"],
      ],
      limit: limit,
      offset: offset,
    })
      .then((response) => {
        setOrders(response?.records.map((item) => ({ ...item, key: item.id })));
        setLength(response?.length);
        setOffset(response?.offset);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

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
  }, [keyword, offset, filter, state, date]);

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
        title="Danh sách đơn hàng"
        actions={actions}
        addonBefore={
          <Tabs
            defaultActiveKey="pending"
            onChange={(key) => setState(key)}
            className="p-0"
            items={[
              {
                key: "all",
                label: "Tất cả",
              },
              {
                key: "pending",
                label: "Chờ xử lý",
              },
              {
                key: "confirmed",
                label: "Đã xác nhận",
              },
              {
                key: "delivering",
                label: "Đang vận chuyển",
              },
              {
                key: "delivered",
                label: "Đã giao",
              },
              {
                key: "cancelled",
                label: "Đã hủy",
              },
              {
                key: "failed",
                label: "Thất bại",
              },
              {
                key: "draft",
                label: "Nháp",
              },
            ]}
          />
        }
        filter={{
          show: true,
          options: filterOptions,
          onChange: (value) => setFilter(value),
        }}
        table={{
          bordered: true,
          loading: loading,
          data: orders,
          columns: columns,
          onSelectedRow: onSelectedRow,
        }}
        search={{
          show: true,
          placeholder: "Tìm kiếm",
          onSearch: onSearch,
        }}
        datePicker={{
          show: true,
          onChange: (date, dateString) => {
            setDate(date);
          },
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
