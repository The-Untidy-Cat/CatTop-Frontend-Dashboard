import {
  Button,
  Form,
  Space,
  Radio,
  Select,
  InputNumber,
  Input,
  Descriptions,
  notification,
  Checkbox,
} from "antd";
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  addOrderItem,
  createOrder,
  updateOrder,
  updateOrderItem,
} from "@/services/order";
import { PAYMENT_METHOD, PAYMENT_STATE } from "@/app.config";
import { ModalToggle } from "@/components/Modal";
import { SearchCustomer } from "../customers";
import { SearchProductVariant } from "../product_variant";
import { formatCurrency } from "@/utils/currency";

const { TextArea } = Input;

export default function NewOrderForm({ onSuccess, onClose, customerId }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    createOrder({ ...values, view_on_create: undefined })
      .then((res) => {
        setTotal(0);
        setCustomer(null);
        if (values?.view_on_create) {
          return router.push(`/orders/${res.id}`);
        } else {
          onSuccess && onSuccess();
          form.resetFields();
          onClose && onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Có lỗi xảy ra",
          description: err?.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const selectedCustomer = (value) => {
    form.setFieldValue("customer_id", value?.id);
    setCustomer(value);
  };

  const updateTotal = () => {
    const items = form.getFieldValue("items");
    const total = items?.reduce((acc, item) => {
      return acc + item?.sale_price * item?.amount;
    }, 0);
    setTotal(total || 0);
  };

  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
      onFieldsChange={updateTotal}
    >
      <p className="m-0 font-semibold">Thông tin cơ bản</p>
      <p className="m-0">Khách hàng</p>
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
        <Input
          className="w-fit"
          placeholder="Chọn khách hàng"
          disabled
          hidden
        />
        <ModalToggle
          modal={{
            title: "Chọn khách hàng",
            className: "lg:min-w-[60%]",
          }}
          button={{
            type: "text",
            label: (
              <div className="border border-gray-300 rounded-md flex flex-col items-start w-full py-1 px-2 font-normal bg-white">
                {customer ? (
                  <p className="text-[#32353c]">
                    {customer?.phone_number}/
                    {String(
                      customer?.last_name + " " + customer?.first_name
                    ).trim()}
                  </p>
                ) : (
                  <p className="text-[#32353c]">Chọn khách hàng</p>
                )}
              </div>
            ),
            className:
              "w-full h-fit hover:bg-transparent p-0 absolute top-0 left-0",
          }}
        >
          <SearchCustomer onSuccess={selectedCustomer} />
        </ModalToggle>
      </Form.Item>
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
        <Radio.Group>
          {Object.keys(PAYMENT_METHOD).map((key) => (
            <Radio value={key} key={key}>
              {PAYMENT_METHOD[key]}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <div className="flex flex-col gap-2 w-full">
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              <div className="flex items-center align-center justify-between">
                <p className="m-0 font-semibold">Giỏ hàng</p>
                <Form.Item className="m-0">
                  <Button
                    type="link"
                    size="small"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    disabled={fields.length >= 10}
                    className="m-0 p-0"
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </div>
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  className="flex items-start gap-1 align-start justify-start"
                  key={key}
                >
                  <p className="m-0 h-10 w-5">{index + 1}.</p>
                  <VariantFormItem
                    keyItem={key}
                    name={name}
                    {...restField}
                    form={form}
                    remove={remove}
                    index={index}
                  />
                </div>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item
          className="m-0"
          name="view_on_create"
          valuePropName="checked"
        >
          <Checkbox>Xem đơn hàng sau khi tạo</Checkbox>
        </Form.Item>
        <p className="flex m-0 font-semibold justify-between">
          Tổng tiền hàng: <span>{formatCurrency(total || 0)}</span>
        </p>
        <Form.Item className="m-0 mt-2">
          <Button
            type="primary"
            className="w-full hover:bg-primary bg-primary/[.8]"
            htmlType="submit"
          >
            Hoàn thành
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

const VariantFormItem = ({
  index,
  keyItem,
  name,
  remove,
  form,
  ...restField
}) => {
  const [variant, setVariant] = useState(null);
  const [amount, setAmount] = useState(0);
  const selectedVariant = (value) => {
    const items = form.getFieldValue("items");
    const variantIds = items?.map((item) => item?.variant_id);
    if (variantIds?.includes(value?.id)) {
      return notification.error({
        message: "Sản phẩm đã tồn tại trong đơn hàng",
      });
    }
    setVariant(value);
    form.setFields([
      {
        name: ["items", index, "variant_id"],
        errors: [],
        value: value?.id,
      },
      {
        name: ["items", index, "sale_price"],
        errors: [],
        value: value?.sale_price,
      },
    ]);
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full border-x px-2">
        <p className="m-0">Sản phẩm</p>
        <Form.Item
          {...restField}
          name={[name, "variant_id"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn sản phẩm hợp lệ",
            },
          ]}
          validateTrigger={["onBlur", "onFocus", "onInput"]}
          className="w-full m-0"
        >
          <Input className="hidden h-16" />
          <ModalToggle
            modal={{
              title: "Chọn sản phẩm",
              className: "lg:min-w-[60%]",
            }}
            button={{
              type: "text",
              label: (
                <div className="border border-gray-300 rounded-md flex flex-col items-start w-full py-2 px-2 font-normal bg-white truncate">
                  {variant ? (
                    <p className="text-[#32353c] truncate text-xs">
                      {variant?.product?.name} - {variant?.name}
                    </p>
                  ) : (
                    <p className="text-[#32353c] truncate text-xs">
                      Chọn sản phẩm
                    </p>
                  )}
                </div>
              ),
              className:
                "w-full h-fit hover:bg-transparent p-0 absolute top-0 left-0",
            }}
          >
            <SearchProductVariant onSuccess={selectedVariant} />
          </ModalToggle>
        </Form.Item>

        <div className="flex items-end align-end gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="m-0">Số lượng</p>
            <Form.Item
              {...restField}
              name={[name, "amount"]}
              rules={[
                {
                  required: true,
                  message: "Bắt buộc",
                },
              ]}
              className="m-0 "
            >
              <InputNumber
                min={1}
                max={10}
                className="w-full"
                onChange={setAmount}
              />
            </Form.Item>
          </div>

          <div className="block w-1/2">
            <p className="m-0 text-end">
              Đơn giá: {formatCurrency(variant?.sale_price || 0)}
            </p>
            <p className="m-0 text-end">
              Thành tiền:{" "}
              {formatCurrency(variant?.sale_price || 0 * amount || 0)}
            </p>{" "}
          </div>
        </div>
      </div>

      <MinusCircleOutlined
        onClick={() => remove(name)}
        className="self-center"
      />
    </>
  );
};

export function EditOrderForm({ onSuccess, onClose, order }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(order);
  }, [order]);

  const handleSubmit = async (values) => {
    setLoading(true);
    updateOrder(order?.id, values)
      .then((res) => {
        onSuccess && onSuccess();
        onClose && onClose();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Có lỗi xảy ra",
          description: err?.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <p className="m-0">Phương thức thanh toán</p>
      <Form.Item className="m-0" name="payment_method">
        <Select
          options={Object.keys(PAYMENT_METHOD).map((key) => ({
            label: PAYMENT_METHOD[key],
            value: key,
          }))}
        />
      </Form.Item>
      {/* <p className="m-0">Trạng thái thanh toán</p>
      <Form.Item className="m-0" name="payment_state">
        <Select
          options={Object.keys(PAYMENT_STATE).map((key) => ({
            label: PAYMENT_STATE[key],
            value: key,
          }))}
        />
      </Form.Item> */}
      <p className="m-0">Mã vận chuyển</p>
      <Form.Item className="m-0" name="tracking_no">
        <Input className="w-full" />
      </Form.Item>
      <p className="m-0">Ghi chú đơn hàng</p>
      <Form.Item className="m-0" name="note">
        <TextArea />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          type="primary"
          className="w-full hover:bg-primary bg-primary/[.8]"
          htmlType="submit"
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export function AddOrderItemForm({ onSuccess, onClose, order }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    addOrderItem(order?.id, values)
      .then((res) => {
        onSuccess && onSuccess();
        onClose && onClose();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Có lỗi xảy ra",
          description: err?.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [variant, setVariant] = useState(null);
  const [amount, setAmount] = useState(0);
  const selectedVariant = (value) => {
    const variantIds = order?.items?.map((item) => item?.variant_id);
    if (variantIds?.includes(value?.id)) {
      return notification.error({
        message: "Sản phẩm đã tồn tại trong đơn hàng",
      });
    }
    setVariant(value);
    form.setFields([
      {
        name: "variant_id",
        value: value?.id,
      },
    ]);
  };
  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <div className="flex flex-col gap-2 w-full">
        <p className="m-0">Sản phẩm</p>
        <Form.Item
          name={"variant_id"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn sản phẩm hợp lệ",
            },
          ]}
          validateTrigger={["onBlur", "onFocus", "onInput"]}
          className="w-full m-0"
        >
          <Input className="hidden h-16" />
          <ModalToggle
            modal={{
              title: "Chọn sản phẩm",
              className: "lg:min-w-[60%]",
            }}
            button={{
              type: "text",
              label: (
                <div className="border border-gray-300 rounded-md flex flex-col items-start w-full py-2 px-2 font-normal bg-white truncate">
                  {variant ? (
                    <p className="text-[#32353c] truncate text-xs">
                      {variant?.product?.name} - {variant?.name}
                    </p>
                  ) : (
                    <p className="text-[#32353c] truncate text-xs">
                      Chọn sản phẩm
                    </p>
                  )}
                </div>
              ),
              className:
                "w-full h-fit hover:bg-transparent p-0 absolute top-0 left-0",
            }}
          >
            <SearchProductVariant onSuccess={selectedVariant} />
          </ModalToggle>
        </Form.Item>

        <div className="flex items-end align-end gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="m-0">Số lượng</p>
            <Form.Item
              name={"amount"}
              rules={[
                {
                  required: true,
                  message: "Bắt buộc",
                },
              ]}
              className="m-0 "
            >
              <InputNumber
                min={1}
                max={10}
                className="w-full"
                onChange={setAmount}
              />
            </Form.Item>
          </div>

          <div className="block w-1/2">
            <p className="m-0 text-end">
              Đơn giá: {formatCurrency(variant?.sale_price || 0)}
            </p>
            <p className="m-0 text-end">
              Thành tiền:{" "}
              {formatCurrency(variant?.sale_price || 0 * amount || 0)}
            </p>{" "}
          </div>
        </div>
      </div>

      <Form.Item className="m-0 mt-2">
        <Button
          type="primary"
          className="w-full hover:bg-primary bg-primary/[.8]"
          htmlType="submit"
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}

export function UpdateAmountOrderItemForm({
  onSuccess,
  onClose,
  orderId,
  item,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    updateOrderItem(orderId, item?.id, values)
      .then((res) => {
        onSuccess && onSuccess();
        form.resetFields();
        onClose && onClose();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Có lỗi xảy ra",
          description: err?.response?.data?.message || err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setFieldValue({
      amount: item?.amount,
    });
  }, [item]);

  return (
    <Form
      onFinish={handleSubmit}
      autoComplete="off"
      className="flex flex-col w-full gap-2"
      disabled={loading}
      form={form}
    >
      <p className="m-0">Số lượng</p>
      <Form.Item className="m-0" name="amount">
        <InputNumber className="w-full" min={0} max={10} step={1} />
      </Form.Item>
      <Form.Item className="m-0 mt-2">
        <Button
          type="primary"
          className="w-full hover:bg-primary bg-primary/[.8]"
          htmlType="submit"
        >
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
}
