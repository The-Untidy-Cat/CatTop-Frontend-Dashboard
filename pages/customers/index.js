import DefaultLayout from "@/components/Layout";
import TableView from "../../components/View/table";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { NewCustomerForm } from "@/components/Form/customers";
import { useEffect, useState } from "react";
import { searchRead } from "@/services/search_read";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      return <>{record.first_name + " " + record.last_name}</>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Đã đặt",
    dataIndex: "order_count",
    key: "order_count",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

export default function CustomerList() {
  const router = useRouter();
  const limit = 5;
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Customer",
        domain: keyword ? [["name", "=", keyword]] : [],
        fields: ["id", "first_name", "last_name","state", "email", "phone_number"],
        limit,
        offset,
      });
      setCustomers(
        response?.records.map((item) => ({
          ...item, key: item.id 
        }))
      );
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
    router.push("/customers/" + data.customer_id);
  };

  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <NewCustomerForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [keyword, offset]);
  return (
    <DefaultLayout
      title={"Khách hàng"}
      breadcrumb={[
        {
          href: "/customers",
          title: "Khách hàng",
        },
      ]}
    >
      <TableView
        title="Khách hàng"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: customers,
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
