// <<<<<<< HEAD
import { Button, Form, Input, InputNumber, Radio, Select, Space } from "antd";
import { getAllCustomer } from "@/services/customer";
import { searchRead } from "@/services/search_read";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");

const NewProduct = (id, form) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomer] = useState([])
  const [products, setProducts] = useState([]);
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  const handleSubmit = (values) => {
    console.log(values);
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }

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
            key: item.id,
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

  return (
    <Form
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      onFinish={handleSubmit}
      
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 w-full">
          <p className="m-0">Tên khách hàng</p>
          <Form.Item
            name="customer_id"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tên khách hàng",
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
            name="payment"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={'chuyen-khoan'}>Chuyển khoản</Radio>
              <Radio value={'tien-mat'}>Tiền mặt</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="w-full col-span-2">
          <Form.List 
            name="products"
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'variant_id']}
                      rules={[{
                        required: true,
                        message: 'Vui lòng chọn sản phẩm'
                      }]}
                      className="w-full"
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

                    <Form.Item
                      {...restField}
                      name={[name, 'amount']}
                    >
                      <InputNumber
                        min={1}
                        max={100}
                        className="w-full"
                      />

                    </Form.Item>
                    
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                
                ))}
                <Form.Item>
                  <Button type="primary" className="bg-primary/[.7] hover:bg-primary" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm sản phẩm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </div>
      <div>
        <Form.Item className="m-0 mt-2">
          <Button type="primary" className="w-full hover:bg-primary bg-primary/[.8]" htmlType="submit">
            Hoàn thành
          </Button>
        </Form.Item>
      </div>
    </Form >
  );
}

export default NewProduct;
// =======
// import { getAllOrder } from "@/services/order";
// import { Button } from "antd";
// import { searchRead } from "@/services/search_read";
// import { useState } from "react";
// import { getUnlimitAllOrder } from "@/services/order";

// export default function Apps() {
//   const [keyword, setKeyword] = useState(null);
//   const limit = null;
//   const [offset, setOffset] = useState(0);
// //  "customer_id","employee", "create_at","payment_state",
//   const getData = async () => {
//     try {
//       const response = await searchRead({
//         model: "Order",
//         domain: keyword ? [["name", "=", keyword]] : [],
//         fields: ["id","payment_state","customer_id","payment_method","created_at","state","employee_id"],
//         limit,
//         offset,
//         relation: ["customer","employee"],
//       });
//       // const response = await getUnlimitAllOrder(
//       //   {
//       //     domain: [],
//       //     fields: ["id", "state", "shopping_method",]
//       //   }
//       // )
//       // const response = await searchRead({
//       //   model: "Order",
//       //   domain: keyword ? [["name", "=", keyword]] : [],
//       //   fields: ["id","state","items"],
//       //   limit,
//       //   offset,
//       // });
//       // const response = await getAllOrder()
//       console.log(response)
//       // setOrders(response?.records.map((item) => ({ ...item, key: item.id })));
//       // setLength(response?.length);
//       // setOffset(response?.offset);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (<Button onClick={getData}>ABC</Button>);
// }
// import React from 'react';
// import { Pagination } from 'antd';
// const App = () => {

// const handle = (a,b) => {
//   console.log(a + "\n" + b)
// }

// return <Pagination length="24" pageSize = "5"
// current = "2" onChange={handle}/>;

// }
// export default App;
// >>>>>>> f2298aa81254856ca0a40ebbc4a02e1c367063e6
