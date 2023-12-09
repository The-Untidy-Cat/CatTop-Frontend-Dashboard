import DefaultLayout from "@/components/Layout";
import TableView from "@/components/View/table";
import { Divider, Table } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPen, FaQuestion } from "react-icons/fa";


export default function Customer() {
  const router = useRouter();
  const { id } = router.query;
  const limit = 5;
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const actions = [
    {
      key: "edit-customer",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật khách hàng",
      children: (
        <EditCustomerForm
          data={{ ...customer}}
          onSuccess={getData}
        />
      ),
      modalProps: {
        centered: true,
      },
    },
  ];

  const items = [
    {
      key: "product-info",
      label: "Thông tin khách hàng",
      children: [
        {
          type: "description",
          key: "product-description",
          items: [
            {
              label: "Họ",
              children: customer?.last_name,
            },
            {
              label: "Tên",
              children: customer?.first_name,
            },
            {
              label: "Ảnh đại diện",
              children: (
                <Image
                  src={customer?.image}
                  alt="avatar"
                  className="h-28 w-28 object-cover"
                  loading="lazy"
                  fallback={<FaQuestion />}
                />
              ),
            },
            {
              label: "Email",
              children: customer?,email,
            },
            {
              label: "Ngày sinh",
              children: customer?.date_of_birth,
            },
            {
              label: "Trạng thái",
              children: CUSTOMER_STATE[customer?.state],
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
                  <NewProductVariantForm
                    onSuccess={getData}
                    productId={product?.id}
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
              data: product?.variants?.map((item) => ({
                ...item,
                key: item.id,
                state: PRODUCT_STATE[item.state],
              })),
              columns: columns,
              onSelectedRow: (data) => {},
            },
            search: {
              show: false,
            },
            pagination: {
              length: product?.variants?.length,
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
        title={product?.name}
      />
    </DefaultLayout>
  );
}
