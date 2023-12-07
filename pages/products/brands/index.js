import DefaultLayout from "@/components/Layout";
import { Form, Input, Button } from "antd";
import { FaPlus } from "react-icons/fa";
import TableView from "../../../components/View/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { searchRead } from "@/services/search_read";
import NewBrandForm from "@/components/Form/brands";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên thương hiệu",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

export default function brandList() {
  const router = useRouter();

  const limit = 5;
  const [brands, setBrands] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Brand",
        domain: keyword ? [["name", "=", keyword]] : [],
        fields: ["id", "name", "state"],
        limit,
        offset,
        }
        
      );
      console.log(response);
      setBrands(response?.records.map((item) => ({ ...item, key: item.id })));
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
    router.push("/brands/" + data.id);
  };

  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <NewBrandForm onSuccess={getData} />,
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
      title={"Thương hiệu"}
      breadcrumb={[
        {
          href: "/products",
          title: "Sản phẩm",
        },
        {
          href: "/products/brands",
          title: "Thương hiệu",
        },
      ]}
    >
      <TableView
        title="Thương hiệu"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: brands,
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
