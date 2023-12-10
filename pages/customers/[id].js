import {
  CUSTOMER_GENDER,
  CUSTOMER_STATE,
  ORDER_STATE,
  PAYMENT_METHOD,
  PAYMENT_STATE,
} from "@/app.config";
import NewCustomerForm, { EditCustomerForm } from "@/components/Form/customers";
import NewOrderForm from "@/components/Form/orders";
import DefaultLayout from "@/components/Layout";
import { ModalToggle } from "@/components/Modal";
import FormView from "@/components/View/form";
import TableView from "@/components/View/table";
import { getCustomer } from "@/services/customer";
import { Button, Divider, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen, FaQuestion } from "react-icons/fa";
import dayjs from "dayjs";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Thanh toán",
    dataIndex: "payment_method",
    key: "payment_method",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "T/thái Thanh toán",
    dataIndex: "payment_state",
    key: "payment_state",
  },
  {
    title: "T/thái đơn hàng",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Tổng",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <a href={`/orders/${record.id}`}>Chi tiết</a>
    ),
    width: 80,
    fixed: "right",
  },
];

export default function Customer() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const getData = async () => {
    setLoading(true);
    getCustomer(id)
      .then((res) => {
        console.log(res);
        setCustomers(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const actions = [
    {
      key: "edit-customer",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật khách hàng",
      children: <EditCustomerForm data={{ ...customer, 
      date_of_birth: customer.date_of_birth ? dayjs(customer.date_of_birth) : null,
      gender: Number(customer.gender),
    }} onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    setOffset((page - 1) * pageSize);
  };

  const items = [
    {
      key: "product-info",
      label: "Thông tin khách hàng",
      children: [
        {
          type: "description",
          key: "customer-description",
          items: [
            {
              label: "Mã khách hàng",
              children: customer?.id,
            },
            {
              label: "Họ",
              children: customer?.last_name,
            },
            {
              label: "Tên",
              children: customer?.first_name,
            },
            {
              label: "Email",
              children: customer?.email,
            },
            {
              label: "Ngày sinh",
              children: customer?.date_of_birth,
            },
            {
              label: "Trạng thái",
              children: CUSTOMER_STATE[customer?.state],
            },
            {
              label: "Giới tính",
              children: CUSTOMER_GENDER[customer?.gender],
            },
            {
              label: "Số điện thoại",
              children: customer?.phone_number,
            },
          ],
        },
      ],
    },
    {
      key: "custome-order-info",
      label: "Danh sách đơn hàng đã đặt",
      children: [
        {
          type: "table",
          key: "order-list",
          items: {
            actions: [
              {
                key: "add",
                buttonLabel: "Thêm",
                buttonType: "primary",
                buttonIcon: <FaPen />,
                title: "Thêm mới",
                children: (
                  <NewOrderForm
                    onSuccess={getData}
                    customer_id={customer?.id}
                  />
                ),
                modalProps: {
                  centered: true,
                },
              },
            ],
            table: {
              bordered: true,
              loading: loading,
              data: customer.orders?.map((item) => ({
                ...item,
                key: item.id,
                state: ORDER_STATE[item.state],
                payment_state: PAYMENT_STATE[item.payment_state],
                payment_method: PAYMENT_METHOD[item.payment_method],
              })),
              columns: columns,
              onSelectedRow: (data) => {},
            },
            search: {
              show: false,
            },
            pagination: {
              length: customer.orders?.length,
              pageSize: 10,
              current: 1,
              onChange: onPaginationChange,
            },
          },
        },
      ],
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <DefaultLayout
      title={"Chi tiết khách hàng"}
      breadcrumb={[
        {
          href: "/customers",
          title: "Khách hàng",
        },
        {
          href: `/customers/${id}`,
          title: customer?.name || "Chi tiết khách hàng",
        },
      ]}
      activeKey={"customer-list"}
    >
      <FormView
        loading={loading}
        items={items}
        actions={actions}
        title={customer?.name}
      />
    </DefaultLayout>
  );
}
