import DefaultLayout from "@/components/Layout";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import NewProductForm from "@/components/Form/products";
import { searchRead } from "@/services/search_read";
import { PRODUCT_STATE } from "@/app.config";
import { getAllProduct } from "@/services/product";

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
  const [filter, setFilter] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    getAllProduct({
      limit,
      offset,
      keyword,
      filter,
    })
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setProducts(
          response?.records.map((item) => ({
            ...item,
            key: item.id,
            brand_name: item.brand.name,
          }))
        );
        setLength(response?.length);
        setOffset(response?.offset);
      })
      .finally(() => {
        setLoading(false);
      });
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
        filter={{
          show: true,
          options: [
            {
              key: "id",
              value: "id",
              label: "ID",
            },
            {
              key: "name",
              value: "name",
              label: "Tên sản phẩm",
            },
            {
              key: "brand",
              value: "brand",
              label: "Thương hiệu",
            },
            {
              key: "SKU",
              value: "SKU",
              label: "SKU",
            },
            {
              key: "state",
              value: "state",
              label: "Trạng thái",
            },
          ],
          onChange: (value) => {
            setFilter(value);
          }
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
