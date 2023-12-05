import DefaultLayout from "@/components/Layout";
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
    title: "Mã nhân viên",
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
        domain: keyword ? [["name", "=", keyword]] : [],
        fields: ["order_id", "customer_id","employee_id", "create_at","payment_state","state"],
        limit,
        offset,
        relation: ["customer:id, first_name","employee:id, first_name"],

      });
      setOrders(response?.records.map((item) => ({ ...item, key: item.id })));
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
    router.push("/orders/" + data.id);
  };

  useEffect(() => {
    getData();
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
          <FaPlus class="text-white mr-2 w-2.5 align-middle" />
        </span>
      ),
      title: "Thêm mới",
      children: <NewOrderForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
    // {
    //   key: "edit",
    //   buttonLabel: <span className="font-bold align-middle	">Sửa</span>,
    //   buttonType: "default",
    //   buttonIcon: <RiPencilFill class="mr-2 w-2.5 align-middle" />,
    //   title: "Sửa",
    //   children: <NewOrderForm />,
    //   modalProps: {
    //     centered: true,
    //   },
    // },
  ];
  return (
    <DefaultLayout
      title={"Thương hiệu"}
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
          data: orders,
          columns: columns,
          onSelectedRow: onSelectedRow,
        }}
        search={{
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
