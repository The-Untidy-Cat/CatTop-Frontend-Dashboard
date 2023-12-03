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
} from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import TableView from "../../components/View/table";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { api } from "@/utils/axios";
import { getAllBrand } from "@/services/brand";
import { searchRead } from "@/services/search_read";

const columns = [
  {
    title: "Mã thương hiệu",
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

const NeworderForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form
      name="registration"
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    >
      <p className="m-0">Tên thương hiệu</p>
      <Form.Item
        label=""
        name="brand_name"
        rules={[
          {
            required: true,
            type: "brand_name",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>

      <p className="m-0">Mô tả</p>
      <Form.Item
        label=""
        name="brand_name"
        rules={[
          {
            required: true,
            type: "brand_state",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button type="primary" className="w-full" htmlType="submit">
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
};

const actions = [
  {
    key: "add",
    buttonLabel: "Thêm",
    buttonType: "primary",
    buttonIcon: <FaPlus />,
    title: "Thêm mới",
    children: <NeworderForm />,
    modalProps: {
      centered: true,
    },
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
      const response = await searchRead(
        "Brand",
        keyword ? [["name", "=", keyword]] : [],
        ["id", "name", "state"],
        limit,
        offset
      );
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

  useEffect(() => {
    getData();
  }, [keyword, offset]);

  return (
    <DefaultLayout>
      <TableView
        title="Thương hiệu"
        data={brands}
        columns={columns}
        actions={actions}
        length={length}
        loading={loading}
        pageSize={limit}
        current={offset / limit + 1}
        onPaginationChange={onPaginationChange}
        onSelectedRow={onSelectedRow}
        onSearch={onSearch}
      />
    </DefaultLayout>
  );
}
