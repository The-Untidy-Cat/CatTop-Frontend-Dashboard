import NewProductForm from "@/components/Form/products";
import DefaultLayout from "@/components/Layout";
import TableView from "@/components/View/table";
import { getAllProductVariant } from "@/services/product_variant";
import { searchRead } from "@/services/search_read";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const columns = [
  {
    title: "Mã biến thể",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên biến thể",
    dataIndex: "name",
    key: "name",
    // render: (_, record) => {
    //   return <>{record.first_name + " " + record.last_name}</>
    // }
  },
  {
    title: "sku",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Giá tiêu chuẩn",
    dataIndex: "standard_price",
    key: "standard_price",
  },
  {
    title: "Giảm giá",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Giá bán",
    dataIndex: "sale_price",
    key: "sale_price",
  },
  {
    title: "Số lượng đã bán",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
];

export default function Products() {
  const router = useRouter();
  const { id } = router.query;
  const limit = 5;
  const [productVariant, setProductVariant] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getAllProductVariant(id);
      setProductVariant(
        response?.records.map((item) => ({ ...item, key: item.id }))
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

  const onSelectedRow = (data) => {
    router.push("/products/variant/" + data.id);
  }

  const onPaginationChange = (page, pageSize) => {
    setOffset((page - 1) * pageSize);
  };
  const actions = [
    {
      key: "add",
      buttonLabel: (
        <span className="text-white font-bold align-middle	">Thêm</span>
      ),
      buttonType: "primary",
      buttonIcon: (
        <span>
          <FaPlus className="text-white mr-2 w-2.5 align-middle" />
        </span>
      ),
      title: "Thêm mới",
      children: <NewProductForm onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [offset]);
  return (
    <DefaultLayout>
      <h1>Product {id}</h1>
      <Table
        dataSource={productVariant}
        columns={columns}
        onRow={(data, index) => {
          return {
            onClick: () => {
              onSelectedRow(data);
            },
          };
        }}
        loading={loading}
      />
    </DefaultLayout>
  );
}
