import { CUSTOMER_STATE } from "@/app.config";
import NewCustomerForm, { EditCustomerForm } from "@/components/Form/customers";
import NewOrderForm from "@/components/Form/orders";
import DefaultLayout from "@/components/Layout";
import FormView from "@/components/View/form";
import TableView from "@/components/View/table";
import { getCustomer } from "@/services/customer";
import { Divider, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen, FaQuestion } from "react-icons/fa";


const columns = [
  
];

export default function Customer() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    getCustomer(id)
      .then((res) => {
        console.log(res )
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
              label: "Email",
              children: customer?.email,
            },
            {
              label: "Trạng thái",
              children: customer?.state,
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
    // {
    //   key: "custome-order-info",
    //   label: "Danh sách đơn hàng đã đặt",
    //   children: [
    //     {
    //       type: "table",
    //       key: "order-list",
    //       items: {
    //         actions: [
    //           {
    //             key: "add",
    //             buttonLabel: "Thêm",
    //             buttonType: "primary",
    //             buttonIcon: <FaPen />,
    //             title: "Thêm mới",
    //             children: (
    //               <NewOrderForm
    //                 onSuccess={getData}
    //                 // customerId={customer?.id}
    //               />
    //             ),
    //             modalProps: {
    //               centered: true,
    //             },
    //           },
    //         ],
    //         table: {
    //           bordered: true,
    //           loading: loading,
    //           data: customer?.map((item) => ({
    //             ...item,
    //             key: item.id,
    //             state: CUSTOMER_STATE[item.state],
    //           })),
    //           columns: columns,
    //           onSelectedRow: (data) => {},
    //         },
    //         search: {
    //           show: false,
    //         },
    //         pagination: {
    //           length: customer?.length,
    //           pageSize: 10,
    //           current: 1,
    //         },
    //       },
    //     },
    //   ],
    // },
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
