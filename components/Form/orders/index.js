import { Button, Form, Input, Radio, Select } from "antd";
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
import { getAllCustomer } from "@/services/customer";
import { getAllProduct } from "@/services/product";
import { searchRead } from "@/services/search_read";

const NewOrderForm = ({ onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createBrand({ ...values, view_on_create: undefined })
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
      // onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
    // disabled={loading}
    // form={form}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 w-full">
          <p className="m-0">Tên khách hàng</p>
          <Form.Item
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
        <div className="flex flex-col gap-2 w-full">
          <p className="m-0">Tên nhân viên</p>
          <Form.Item
            className="m-0"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tên nhân viên",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn nhân viên"
              optionFilterProp="children"
              filterOption={filterOption}
              options={customers}
            />
          </Form.Item>
        </div>
      </div>
      <p>Phương thức thanh toán</p>
      <Form.Item
        className="m-0"
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={'chuyen-khoan'}>Chuyển khoản</Radio>
          <Radio value={'tien-mat'}>Tiền mặt</Radio>
        </Radio.Group>
      </Form.Item>

      <p>Sản phẩm</p>
      <Form.Item
        name="order_product"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn sản phẩm'
          },
        ]}
        className="m-0"
      >
        <Select
          mode="multiple"
          showSearch
          placeholder="Chọn sản phẩm"
          optionFilterProp="children"
          filterOption={filterOption}
          options={products}
          className="w-full"
        />
      </Form.Item>


      <Form.Item className="m-0 mt-2">
        <Button type="primary" className="w-full hover:bg-primary bg-primary/[.8]" htmlType="submit">
          Hoàn thành
        </Button>
      </Form.Item>
    </Form >
  );
}
export default NewOrderForm;