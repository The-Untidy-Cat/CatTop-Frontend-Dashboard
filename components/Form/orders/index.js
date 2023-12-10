import { Button, Form, Space, Radio, Select, InputNumber } from "antd";
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
import { getAllCustomer } from "@/services/customer";
// import { getAllProduct } from "@/services/product";
import { searchRead } from "@/services/search_read";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createOrder } from "@/services/order";

const NewOrderForm = ({ onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createOrder({ ...values, view_on_create: undefined })
      .then((res) => {
        Modal.destroyAll();
        form.resetFields();
        onClose && onClose();
        if (values.view_on_create) {
          router.push(`/orders/${res.id}`);
        } else {
          onSuccess && onSuccess();
        }
      })
      .catch((err) => { })
      .finally(() => {
        setLoading(false);
      });
  };
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomer] = useState([])
  const [products, setProducts] = useState([]);
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
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    // disabled={loading}
    // form={form}
    >
        <div className="flex flex-col gap-2 w-full">
          <p className="m-0">Tên khách hàng</p>
          <Form.Item
            className="m-0"
            name="customer_id"
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
        <div>
          <p className="m-0">Phương thức thanh toán</p>
          <Form.Item
            name="payment_method"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={'banking'}>Chuyển khoản</Radio>
              <Radio value={'cash'}>Tiền mặt</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="w-full">
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
export default NewOrderForm;