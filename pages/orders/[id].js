import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";
import TableView from "../../components/View/table";
import { Button, Modal, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { getOrder, updateOrder, updateOrderItem } from "@/services/order";
import {
  ORDER_STATE,
  PAYMENT_METHOD,
  PAYMENT_STATE,
  PROVINCES,
} from "@/app.config";
import { FaPen, FaTrash } from "react-icons/fa";
import NewOrderForm, {
  EditOrderForm,
  AddOrderItemForm,
  UpdateAmountOrderItemForm,
} from "@/components/Form/orders";
import FormView from "@/components/View/form";
import { formatCurrency } from "@/utils/currency";
import { ModalToggle } from "@/components/Modal";
import { MdStarRate } from "react-icons/md";

const confirm = ({
  onOk,
  title = "Xác nhận",
  content = "Không thể hoàn tác sau khi xác nhận",
}) => {
  return Modal.confirm({
    title: title,
    content: content,
    onOk: onOk,
    centered: true,
    okButtonProps: {
      className: "bg-primary text-white",
    },
  });
};

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState([]);

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

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      render: (text, record) => record?.variant?.product?.name,
    },
    {
      title: "Biến thể",
      dataIndex: "variant_name",
      key: "variant_name",
      render: (text, record) => record?.variant?.name,
    },
    {
      title: "Giá ban đầu",
      dataIndex: "standard_price",
      key: "standard_price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Giá bán",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (text) => formatCurrency(text),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <ModalToggle
            button={{
              size: "small",
              type: "text",
              icon: <FaPen />,
            }}
            modal={{
              title: "Sửa số lượng",
            }}
          >
            <UpdateAmountOrderItemForm
              orderId={order?.id}
              item={record}
              onSuccess={getData}
            />
          </ModalToggle>
          <ModalToggle
            button={{
              size: "small",
              type: "text",
              icon: <MdStarRate />,
            }}
            modal={{
              title: "Đánh giá",
            }}
          >
            <div className="flex flex-col">
              <p>{record?.rating}</p>
              <p>{record?.review}</p>
            </div>
          </ModalToggle>
          <Button
            type="text"
            icon={<FaTrash />}
            size="small"
            onClick={() => {
              setLoading(true);
              updateOrderItem(order?.id, record?.id, { amount: 0 }).then(() => getData()).catch((err) => {
                notification.error({
                  message: "Lỗi",
                  description: err?.response?.data?.message || err.message,
                });
              }).finally(() => {
                setLoading(false);
              });
            }}
          />
        </div>
      ),
    },
  ];

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
              label: "Phương thức thanh toán",
              children: PAYMENT_METHOD[order?.payment_method],
            },
            {
              label: "Trạng thái thanh toán",
              children: PAYMENT_STATE[order?.payment_state],
            },
            {
              label: "Trạng thái đơn hàng",
              children: ORDER_STATE[order?.state],
            },
            {
              label: "Thông tin giao hàng",
              children: order?.address ? (
                <>
                  {order?.address?.name} | {order?.address?.phone} <br />
                  {order?.address?.address_line} <br />
                  {
                    PROVINCES[order?.address?.province]?.districts
                      ?.find((d) => d?.id == order?.address?.district)
                      ?.wards?.find((w) => w?.id == order?.address?.ward)?.name
                  }
                  ,{" "}
                  {
                    PROVINCES[order?.address?.province]?.districts?.find(
                      (d) => d?.id == order?.address?.district
                    )?.name
                  }
                  , {PROVINCES[order?.address?.province]?.name},
                </>
              ) : (
                "Nhận tại cửa hàng"
              ),
            },
            {
              label: "Mã vận đơn",
              children: order?.tracking_no || "Chưa có",
            },
            {
              label: "Ghi chú",
              children: order?.note || "Không có",
            },
            {
              label: "Ngày tạo",
              children: order?.created_at
                ? new Date(order?.created_at).toLocaleString()
                : "",
            },
          ],
        },
      ],
    },
    {
      key: "detail-order-info",
      label: "Giỏ hàng",
      children: [
        {
          type: "table",
          key: "order-list",
          items: {
            actions: [ORDER_STATE.draft, ORDER_STATE.pending].includes(
              ORDER_STATE[order?.state]
            )
              ? [
                  {
                    key: "add",
                    buttonLabel: "Thêm sản phẩm",
                    buttonType: "primary",
                    buttonIcon: <FaPen />,
                    title: "Thêm sản phẩm",
                    children: (
                      <AddOrderItemForm order={order} onSuccess={getData} />
                    ),
                    modalProps: {
                      centered: true,
                    },
                  },
                ]
              : [],
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (order) {
      var temp = [];
      if (
        [
          ORDER_STATE.refunded,
          ORDER_STATE.cancelled,
          ORDER_STATE.failed,
        ].includes(ORDER_STATE[order?.state])
      ) {
        setActions(temp);
        return;
      }
      temp.push({
        key: "edit-order",
        buttonLabel: "Sửa",
        buttonType: "default",
        buttonIcon: <FaPen />,
        title: "Cập nhật đơn hàng",
        children: <EditOrderForm order={order} onSuccess={getData} />,
      });
      if (
        [PAYMENT_STATE.unpaid, PAYMENT_STATE.partially_paid].includes(
          PAYMENT_STATE[order?.payment_state]
        )
      )
        temp.push({
          key: "confirm-payment",
          buttonLabel: "Xác nhận thanh toán",
          buttonType: "primary",
          type: "button",
          onClick: () => {
            confirm({
              onOk: () => {
                setLoading(true);
                updateOrder(order?.id, { payment_state: "paid" })
                  .then(() => {
                    getData();
                  })
                  .catch((err) => {
                    notification.error({
                      message: "Lỗi",
                      description: err?.response?.data?.message || err.message,
                    });
                  })
                  .finally(() => {});
              },
              title: "Xác nhận thanh toán",
              content: "Bạn có chắc chắn muốn xác nhận thanh toán?",
            });
          },
        });
      //chuyển trạng thái đơn tương ứng
      switch (order?.state) {
        case "cancelled":
        case "refunded":
        case "failed":
          break;
        case "draft":
        case "pending":
          if (order?.items?.length > 0)
            temp.push({
              key: "confirm-order",
              buttonLabel: "Xác nhận đơn hàng",
              buttonType: "primary",
              type: "button",
              onClick: () => {
                confirm({
                  title: "Xác nhận đơn hàng",
                  content:
                    "Hãy chắc chắn rằng bạn đã xác nhận đơn hàng này với khách hàng",
                  onOk: () => {
                    setLoading(true);
                    updateOrder(order?.id, { state: "confirmed" })
                      .then(() => {
                        getData();
                      })
                      .catch((err) => {
                        notification.error({
                          message: "Lỗi",
                          description:
                            err?.response?.data?.message || err.message,
                        });
                      })
                      .finally(() => {});
                  },
                });
              },
            });
          break;
        case "confirmed":
          temp.push({
            key: "delivering-order",
            buttonLabel: "Giao hàng",
            buttonType: "primary",
            type: "button",
            onClick: () => {
              confirm({
                title: "Xác nhận giao hàng?",
                content:
                  order?.address_id && !order?.tracking_no
                    ? "Lưu ý: Đơn hàng này chưa được cập nhật mã vận đơn"
                    : "",
                onOk: () => {
                  setLoading(true);
                  updateOrder(order?.id, { state: "delivering" })
                    .then(() => {
                      getData();
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Lỗi",
                        description:
                          err?.response?.data?.message || err.message,
                      });
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                },
              });
            },
          });
          break;
        case "delivering":
          temp.push({
            key: "delivered-order",
            buttonLabel: "Hoàn tất đơn hàng",
            buttonType: "primary",
            type: "button",
            onClick: () => {
              confirm({
                title: "Xác nhận đã giao hàng?",
                onOk: () => {
                  setLoading(true);
                  updateOrder(order?.id, { state: "delivered" })
                    .then(() => {
                      getData();
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Lỗi",
                        description:
                          err?.response?.data?.message || err.message,
                      });
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                },
              });
            },
          });
          break;
        case "delivered":
          temp.push({
            key: "refunded-order",
            buttonLabel: "Hoàn tiền",
            buttonType: "default",
            type: "button",
            onClick: () => {
              confirm({
                title: "Xác nhận hoàn tiền?",
                content: "Đơn hàng sẽ được chuyển sang trạng thái đã hoàn tiền",
                onOk: () => {
                  setLoading(true);
                  updateOrder(order?.id, { state: "refunded" })
                    .then(() => {
                      getData();
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Lỗi",
                        description:
                          err?.response?.data?.message || err.message,
                      });
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                },
              });
            },
          });
          break;
      }
      // hủy đơn
      switch (order?.state) {
        case "delivered":
        case "cancelled":
        case "refunded":
        case "failed":
          break;
        default:
          temp.push({
            key: "cancel-order",
            buttonLabel: "Hủy đơn hàng",
            type: "button",
            className: "text-white bg-red-500",
            onClick: () => {
              confirm({
                onOk: () => {
                  setLoading(true);
                  updateOrder(order?.id, {
                    state:
                      order?.payment_state == "paid" ? "refunded" : "cancelled",
                  })
                    .then(() => {
                      getData();
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Lỗi",
                        description:
                          err?.response?.data?.message || err.message,
                      });
                    })
                    .finally(() => {});
                },
                title: "Xác nhận hủy đơn",
                content:
                  "Bạn có chắc chắn muốn hủy đơn hàng này?" +
                  (order?.payment_state == "paid"
                    ? " Đơn hàng đã được thanh toán, đơn sẽ được chuyển sang trạng thái đã hoàn tiền"
                    : ""),
              });
            },
          });
          break;
      }
      setActions(temp);
    }
  }, [order]);

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
          title: order?.id ? "Đơn hàng #" + order?.id : "Chi tiết đơn hàng",
        },
      ]}
      activeKey={"order-list"}
    >
      <FormView
        loading={loading}
        items={items}
        actions={actions}
        title={"Đơn hàng #" + id}
      />
    </DefaultLayout>
  );
}
