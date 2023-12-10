import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";
import TableView from "../../components/View/table";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getOrder } from "@/services/order";
import { ORDER_STATE, PAYMENT_STATE } from "@/app.config";
import { FaPen } from "react-icons/fa";
import NewOrderForm, { EditOrderForm } from "@/components/Form/orders";
import FormView from "@/components/View/form";

const columns = [
  {
    title: "#",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Sản phẩm",
    dataIndex: "customer_name",
    key: "customer_name",
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
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Tình trạng",
    dataIndex: "order_status",
    key: "order_status",
  },
];

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    getOrder(id)
      .then((res) => {
        console.log(res);
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const items = [
    {
      key: "order-info",
      label: "Thông tin đơn hàng",
      children: [
        {
          type: "description",
          key: "order-description",
          items: [
            {
              label: "Mã đơn hàng",
              children: order?.id,
            },
            {
              label: "Khách hàng",
              children:
                order?.customer?.last_name + " " + order?.customer?.first_name,
            },
            {
              label: "Nhân viên",
              children: order?.employee_id || "Admin",
            },
            {
              label: "Hình thức mua hàng",
              children: order?.payment_method,
            },
            {
              label: "Trạng thái mua hàng",
              children: PAYMENT_STATE[order?.payment_state],
            },
            {
              label: "Trạng thái",
              children: ORDER_STATE[order?.state],
            },
          ],
        },
      ],
    },
    {
      key: "detail-order-info",
      label: "Chi tiết đơn hàng",
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
                    // customerId={customer?.id}
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
              data: order?.items?.map((item) => ({
                ...item,
                key: item.id,
              })),
              columns: columns,
              onSelectedRow: (data) => {},
            },
            search: {
              show: false,
            },
            pagination: {
              length: order?.items?.length,
              pageSize: 10,
              current: 1,
            },
          },
        },
      ],
    },
  ];

  const actions = [
    {
      key: "edit-order",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật đơn hàng",
      children: <EditOrderForm />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <DefaultLayout
      title={"Chi tiết đơn hàng"}
      breadcrumb={[
        {
          href: "/orders",
          title: "Đơn hàng",
        },
        {
          href: `/orders/${id}`,
          title: order?.name || "Chi tiết đơn hàng",
        },
      ]}
      activeKey={"order-list"}
    >
      <FormView
        loading={loading}
        items={items}
        actions={actions}
        title={order?.name}
      />
    </DefaultLayout>
  );
}
