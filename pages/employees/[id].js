import { EMPLOYEE_GENDER, EMPLOYEE_STATE, ORDER_STATE, PAYMENT_METHOD, PAYMENT_STATE } from "@/app.config";
import { EditEmployeeForm } from "@/components/Form/employees";
import NewOrderForm from "@/components/Form/orders";
import DefaultLayout from "@/components/Layout";
import { ModalToggle } from "@/components/Modal";
import FormView from "@/components/View/form";
import TableView from "@/components/View/table";
import { getCustomer } from "@/services/employee";
import { getEmployee } from "@/services/employee";
import { Divider, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen, FaQuestion } from "react-icons/fa";

const columns = [
  {
    title: "ID",
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
      <ModalToggle
        button={{
          label: "Chi tiết",
          type: "text",
        }}
        modal={{
          title: "Chi tiết đơn hàng",
        }}
      >
        <NewOrderForm />
      </ModalToggle>
    ),
    width: 80,
    fixed: "right",
  },
];

export default function Employees() {
  const router = useRouter();
  const { id } = router.query;
  const [employee, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    getEmployee(id)
      .then((res) => {
        console.log(res);
        setEmployees(res);
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
      key: "edit-employee",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật nhân viên",
      children: (
        <EditEmployeeForm data={{ ...employee }} onSuccess={getData} />
      ),
      modalProps: {
        centered: true,
      },
    },
  ];

  const items = [
    {
      key: "product-info",
      label: "Thông tin nhân viên",
      children: [
        {
          type: "description",
          key: "employee-description",
          items: [
            {
              label: "Mã nhân viên",
              children: employee?.id,
            },
            {
              label: "Họ",
              children: employee?.last_name,
            },
            {
              label: "Tên",
              children: employee?.first_name,
            },
            {
              label: "Email",
              children: employee?.email,
            },
            {
              label: "Ngày sinh",
              children: employee?.date_of_birth,
            },
            {
              label: "Trạng thái",
              children: EMPLOYEE_STATE[employee?.state],
            },
            {
              label: "Giới tính",
              children: EMPLOYEE_GENDER[employee?.gender],
            },
            {
              label: "Số điện thoại",
              children: employee?.phone_number,
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
                    // employeeId={employee?.id}
                  />
                ),
                modalProps: {
                  centered: true,
                },
              },
            ],
            // table: {
            //   bordered: true,
            //   loading: loading,
            //   data: employee.orders?.map((item) => ({
            //     ...item,
            //     key: item.id,
            //     state: ORDER_STATE[item.state],
            //     payment_state: PAYMENT_STATE[item.payment_state],
            //     payment_method: PAYMENT_METHOD[item.payment_method],
            //   })),
            //   columns: columns,
            //   onSelectedRow: (data) => {},
            // },
            // search: {
            //   show: false,
            // },
            // pagination: {
            //   length: employee.orders?.length,
            //   pageSize: 10,
            //   current: 1,
            // },
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
      title={"Chi tiết nhân viên"}
      breadcrumb={[
        {
          href: "/employees",
          title: "Nhân viên",
        },
        {
          href: `/employees/${id}`,
          title: employee?.name || "Chi tiết nhân viên",
        },
      ]}
      activeKey={"employee-list"}
    >
      <FormView
        loading={loading}
        items={items}
        actions={actions}
        title={employee?.name}
      />
    </DefaultLayout>
  );
}
