import DefaultLayout from "@/components/Layout";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import NewProductForm from "@/components/Form/products";
import { searchRead } from "@/services/search_read";
import { PRODUCT_STATE } from "@/app.config";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
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
    width: 120,
  },
  {
    title: "Biến thể",
    dataIndex: "variant_count",
    key: "variant_count",
    width: 100,
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
    render: (text) => PRODUCT_STATE[text],
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
        domain: keyword
          ? [
              "||",
              ["products.name", "like", `%${keyword}%`],
              ["products.state", "like", `%${keyword}%`],
              ["product_variants.name", "like", `%${keyword}%`],
            ]
          : [],
        fields: ["products.id", "products.name", "brand_id", "products.state"],
        limit,
        offset,
        relation: ["brand:id,name"],
        joins: [
          [
            "product_variants",
            "products.id",
            "=",
            "product_variants.product_id",
          ],
        ],
        count: ["products.id"],
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
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
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
