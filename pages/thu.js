import { Button, Form, Input, Radio, Select, InputNumber, Table } from "antd";
import { getAllCustomer } from "@/services/customer";
import { getAllProduct } from "@/services/product";
import { searchRead } from "@/services/search_read";
import { api } from "@/utils/axios";
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");

const NewProduct = (id, form) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomer] = useState([])
  const [products, setProducts] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: '',
      name: '',
    },
  ]);
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    const newData = {
      key: count,
      name: ``,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const getCustomer = async () => {
    try {
      const response = await getAllCustomer()
      console.log(response)
      setCustomer(response?.records.map(
        (item) => (
          {
            value: item.id,
            label: item.last_name + " " + item.first_name
          })))
    }
    catch (e) {
      console.log(e)
    }
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "sanpham",
      key: "sanpham",
      render: () => (
        <Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn một giá trị",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn sản phẩm"
            optionFilterProp="children"
            filterOption={filterOption}
            options={products}
            className="w-full"
          />
        </Form.Item>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: "soluong",
      key: "soluong",
      render: () => (
        <Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn một giá trị",
            },
          ]}
        >
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            className="w-1/2"
          />
        </Form.Item>
      ),
    },
    {
      title: '',
      render: (record) => (
        <Form.Item
          className="m-0"
        >
          <Button
            onClick={() => handleDelete(record.key)}
          >-
          </Button>
        </Form.Item>
      ),
    }
  ]
  const getProducts = async () => {
    try {
      // const response = await getAllProduct()
      const response = await searchRead({
        model: "Product",
        domain: [],
        fields: ["id", "name"],
      })
      setProducts(response?.records.map(
        (item) => (
          {
            value: item.id,
            label: item.name
          }
        )
      ))
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getCustomer()
    getProducts()
  }, [])


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 w-full">
          <p className="m-0">Tên khách hàng</p>
          <Form.Item
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn một giá trị",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn khách hàng"
              optionFilterProp="children"
              filterOption={filterOption}
              options={customers}
            />
          </Form.Item>
        </div>
        <div className="col-span-2">
          <p className="m-0">Phương thức thanh toán</p>
          <Form.Item
            className="m-0"
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={'chuyen-khoan'}>Chuyển khoản</Radio>
              <Radio value={'tien-mat'}>Tiền mặt</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p>Sản phẩm</p>
          <Button
            onClick={handleAdd}
            type="primary"
            className="bg-primary/[.7] hover:bg-primary"
          >
            Thêm sản phẩm
          </Button>

          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
           {/* <Table dataSource={dataSource} columns={columns} /> */}
        </div>
        <div className="col-span-2">
          <Form.Item className="m-0 mt-2">
            <Button type="primary" className="w-full hover:bg-primary bg-primary/[.8]" htmlType="submit">
              Hoàn thành
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form >
  );
}

export default NewProduct;
