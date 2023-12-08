import DefaultLayout from "@/components/Layout";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import NewProductForm from "@/components/Form/products";
import { searchRead } from "@/services/search_read";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

export default function ProductList() {
  const router = useRouter();
  const limit = 5;
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Product",
        domain: keyword ? [["name", "like", `%${keyword}%`]] : [],
        fields: ["id", "name", "brand_id", "description", "state"],
        limit,
        offset,
        relation: ["brand:id,name"],
      });
      setProducts(
        response?.records.map((item) => ({
          ...item,
          key: item.id,
          brand_name: item.brand.name,
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
    router.push("/products/" + data.id);
  };

  const actions = [
    {
      key: "add",
      buttonLabel:"Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus/>,
      title: "Thêm mới",
      children: <NewProductForm onSuccess={getData} />,
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
      title={"Sản phẩm"}
      breadcrumb={[
        {
          href: "/products",
          title: "Sản phẩm",
        },
      ]}
      activeKey={"product-list"}
    >
      <TableView
        title="Danh sách sản phẩm"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: products,
          columns: columns,
          onSelectedRow: onSelectedRow,
        }}
        search={{
          show: true,
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
