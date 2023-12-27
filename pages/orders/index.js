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
import { FaCartShopping } from "react-icons/fa6";
import TableView from "../../components/View/table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";
import { ORDER_STATE, PAYMENT_STATE } from "@/app.config";
import { Popover, Tabs } from "antd";
import dayjs from "dayjs";
import NewOrderForm from "@/components/Form/orders";
import { formatCurrency } from "@/utils/currency";

const ItemList = ({ items }) => {
  return (
    <div className="flex flex-col divide-y">
      {items.map((item) => (
        <div className="flex flex-row gap-1 py-1" key={Math.random(1000, 9999)}>
          <div className="flex flex-col items-start w-2/3 grow-0">
            <p className="font-medium">{item?.variant?.product?.name}</p>
            <p className="text-gray-400">{item?.variant?.name}</p>
          </div>
          <div className="flex flex-col items-end justify-end w-1/3">
            <p className="font-medium">
              {item.amount} x {formatCurrency(item.sale_price)}
            </p>
            <p className="font-semibold">
              {formatCurrency(item.amount * item.sale_price)}
            </p>
          </div>
        </div>
      ))}
      <div className="flex flex-row justify-between py-1">
        <p className="font-medium">Tổng cộng</p>
        <p className="font-semibold">
          {formatCurrency(
            items.reduce((total, item) => {
              return total + item.amount * item.sale_price;
            }, 0)
          )}
        </p>
      </div>
    </div>
  );
};

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
      return <>{record.employee?.first_name || "Admin"}</>;
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
  {
    title: "",
    dataIndex: "",
    key: "action",
    render: (_, record) => {
      return (
        <Popover
          content={<ItemList items={record?.items} />}
          title="Giỏ hàng"
          trigger="hover"
        >
          <FaCartShopping />
        </Popover>
      );
    },
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
  {
    label: "Serial number",
    value: "order_items.serial_number",
  }
];

export function OrderList() {
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
        ["order_items", "order_items.order_id", "=", "orders.id"],
        // ["product_variants", "items.variant_id", "=", "product_variants.id"],
      ],
      limit: limit,
      offset: offset,
      order_by: "orders.created_at",
      sort: "asc",
      count: ["orders.id"],
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
      buttonLabel: "Tạo đơn hàng",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <NewOrderForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];
  return (
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
              key: "refunded",
              label: "Hoàn tiền",
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
  );
}

export default function Order() {
  return (
    <DefaultLayout
      title={"Đơn hàng"}
      breadcrumb={[
        {
          href: "/orders",
          title: "Đơn hàng",
        },
      ]}
      activeKey={"order-list"}
    >
      <OrderList />
    </DefaultLayout>
  );
}
