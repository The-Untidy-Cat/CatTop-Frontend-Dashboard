import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import {
  DatePicker,
  Divider,
  Tabs,
  Pagination,
  Table,
  Form,
  Input,
  Button,
  Breadcrumb,
} from "antd";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/router";
import NewProductForm from "@/components/Form/products";
import { searchRead } from "@/services/search_read";
const columns = [
  {
    title: "Mã sản phẩm",
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

// {
//   key: "edit",
//   buttonLabel: <span className="font-bold align-middle	">Sửa</span>,
//   buttonType: "default",
//   buttonIcon: <RiPencilFill className="mr-2 w-2.5 align-middle" />,
//   title: "Sửa",
//   children: <NewProductForm />,
//   modalProps: {
//     centered: true,
//   },
// },

export default function productList() {
  const router = useRouter();
  const limit = 5;
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState([]);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchRead({
        model: "Product",
        domain: keyword ? [["name", "=", keyword]] : [],
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
    router.push("/products/" + data.product_id);
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
    >
      <div className="float-left">
        <p>
          <span className="text-2xl font-bold mr-3">Sản phẩm</span>
          <span className="font-bold text-slate-500">
            15 sản phẩm được tìm thấy
          </span>
        </p>
      </div>
      <TableView
        title="Sản phẩm"
        actions={actions}
        table={{
          bordered: true,
          loading: loading,
          data: products,
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
