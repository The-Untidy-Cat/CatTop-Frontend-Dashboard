import DefaultLayout from "@/components/Layout";
import { DatePicker, Divider, Tabs, Pagination, Table, Row, Col, Statistic, Button } from "antd";
import { App } from "@/pages/test.js";
import { LikeOutlined } from '@ant-design/icons';
import { FaPlus, FaShoppingBag, FaUserPlus } from "react-icons/fa";
import { MdAttachMoney, MdOutlineProductionQuantityLimits } from "react-icons/md";
import TableTemplate from "./table_template";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/router";
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
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Tên sản phẩm</p>
          <Form.Item
            name="order_product_name"
            rules={[
              {
                required: true,
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Mã khách hàng</p>
          <Form.Item
            name="order_customer"
            rules={[
              {
                required: true,
                pattern:
                  /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      <p className="m-0">Địa chỉ</p>
      <Form.Item
        label=""
        name="order_address"
        rules={[
          {
            required: true,
            type: "order_phone",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Giá</p>
          <Form.Item
            name="order_price"
            rules={[
              {
                required: true,
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <p className="m-0">Ngày đặt hàng</p>
          <Form.Item
            name="order_date"
            rules={[
              {
                required: true,
                pattern:
                  /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/u,
                message: "Không hợp lệ",
              },
            ]}
            className="m-0"
          >
            <DatePicker />
          </Form.Item>
        </div>
      </div>
      {/* <p className="m-0">Tên đăng nhập</p>
      <Form.Item
        label=""
        name="username"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9.\S]+$/,
            message: "Chỉ nhập chữ, số và dấu chấm!",
          },
        ]}
        className="m-0"
      >
        <Input />
      </Form.Item>
      <p className="m-0">Mật khẩu</p>
      <Form.Item
        label=""
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập Mật khẩu!" },
          { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
        ]}
        className="m-0"
      >
        <Input.Password />
      </Form.Item> */}
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
      buttonLabel: <span class="text-white font-bold align-middle	">Thêm</span>,
      buttonType: "primary",
      buttonIcon: <span><FaPlus class ="text-white mr-2 w-2.5 align-middle"/></span>,
      title: "Thêm mới",
      children: <NeworderForm />,
      modalProps: {
          centered: true,
      },
  },
  {
      key: "edit",
      buttonLabel: <span class="font-bold align-middle	">Sửa</span>,
      buttonType: "default",
      buttonIcon: <RiPencilFill class ="mr-2 w-2.5 align-middle"/>,
      title: "Sửa",
      children: <NeworderForm />,
      modalProps: {
          centered: true,
      },
  },
];

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_id",
    key: "customer_id",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Giá sản phẩm",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tình trạng",
    dataIndex: "order_status",
    key: "order_status",
  },
];

const data = [
  {
    id: "1",
    order_id: "1",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    order_status: "Đang xử lý",
  },
  {
    id: "2",
    order_id: "2",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    order_status: "Đang xử lý",
  },
  {
    id: "3",
    order_id: "3",
    product_name: "John Brown",
    customer_id: "32",
    address: "New York No. 1 Lake Park",
    date: "2021-10-10",
    price: "1000",
    order_status: "Đang xử lý",
  },
];

export default function Home() {
  const router = useRouter();
  const onSelectedRow = (data) => {
    router.push("/orders/" + data.id);
  }
  return (
    <DefaultLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Khách hàng" value={1128} prefix={<FaUserPlus />} />
        </Col>
        <Col span={6}>
          <Statistic title="Đơn hàng" value={1128} prefix={<FaShoppingBag />} />
        </Col>
        <Col span={6}>
          <Statistic title="Sản phẩm" value={1128} prefix={<MdOutlineProductionQuantityLimits />} />
        </Col>
        <Col span={6}>
          <Statistic title="Doanh thu" value={1128} prefix={<MdAttachMoney />} />
        </Col>
      </Row>
      <Divider />
      
      <div class="float-left">
        <p>
          <span class="text-2xl font-bold mr-3">Đơn hàng</span>
          <span class="font-bold text-slate-500	">3 đơn hàng đang chờ được xử lý</span>
        </p>
      </div>
      <TableTemplate data={data} columns={columns} title={"Tìm kiếm đơn hàng"} actions={actions} onSelectedRow={onSelectedRow}/>
    </DefaultLayout>
  );
}
