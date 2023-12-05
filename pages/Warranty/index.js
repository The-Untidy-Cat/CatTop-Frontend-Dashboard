import DefaultLayout from "@/components/Layout";
import { DatePicker, Divider, Tabs, Pagination, Table, Form, Input, Button, Select } from "antd";
import TableTemplate from "../table_template";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
// import options from "tailwind-datepicker-react/types/Options";
const optionsOrder = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },{
        value: '3',
        label: '3',
    },{
        value: '4',
        label: '4',
    },
]
const optionsProduct = [
    {
        value: 'sp1',
        label: 'sp1',
    },
    {
        value: 'sp2',
        label: 'sp2',
    },
]
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
        title: "Ngày bảo hành",
        dataIndex: "warranty_date",
        key: "warranty_date",
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
        warranty_date: "01/12/2023",
        order_status: "Đã hoàn thành",
    },
    {
        id: "2",
        order_id: "2",
        product_name: "John Brown",
        customer_id: "32",
        warranty_date: "01/12/2023",
        order_status: "Đang xử lý",
    },
    {
        id: "3",
        order_id: "3",
        product_name: "John Brown",
        customer_id: "32",
        warranty_date: "01/12/2023",
        order_status: "Đang xử lý",
    },
    {
        id: "4",
        order_id: "4",
        product_name: "John Brown",
        customer_id: "32",
        warranty_date: "01/12/2023",
        order_status: "Đã hoàn thành",
    },
];

const NewProductForm = () => {
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
                <div className="flex flex-col gap-2 w-1/3">
                    <p className="m-0">Mã đơn hàng</p>
                    <Form.Item
                        name="product_id"
                        className="m-0"
                    >
                        <Select
                            showSearch
                            placeholder="Mã đơn hàng"
                            optionFilterProp="children"
                            onChange={handleChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={optionsOrder}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-2 w-2/3">
                    <p className="m-0">Tên sản phẩm</p>
                    <Form.Item
                        name="product_name"
                        className="m-0"
                    >
                        <Select
                            showSearch
                            placeholder="Tên đơn hàng"
                            optionFilterProp="children"
                            onChange={handleChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={optionsProduct}
                        />
                    </Form.Item>
                </div>
            </div>

            <p className="m-0">Tên khách hàng</p>
            <Form.Item
                label=""
                name="product_brand"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Email không hợp lệ!",
                    },
                ]}
                className="m-0"
            >
                <Input readOnly />
            </Form.Item>
            <Form.Item className="m-0 mt-2">
                <Button type="primary" className="w-full" htmlType="submit">
                    Thêm
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
        buttonIcon: <span><FaPlus class="text-white mr-2 w-2.5 align-middle" /></span>,
        title: "Thêm mới",
        children: <NewProductForm />,
        modalProps: {
            centered: true,
        },
    },
    // {
    //     key: "edit",
    //     buttonLabel: <span class="font-bold align-middle	">Sửa</span>,
    //     buttonType: "default",
    //     buttonIcon: <RiPencilFill class="mr-2 w-2.5 align-middle" />,
    //     title: "Sửa",
    //     children: <NewProductForm />,
    //     modalProps: {
    //         centered: true,
    //     },
    // },
];



export default function warrantyList() {
    const router = useRouter();
    const onSelectedRow = (data) => {
      router.push("/Warranty/" + data.order_id + "/" + data.product_name);
    }
    return (
        <DefaultLayout>
            <div class="float-left">
                <p>
                    <span class="text-2xl font-bold mr-3">Danh sách bảo hành</span>
                    <span class="font-bold text-slate-500">15 sản phẩm bảo hành được tìm thấy</span>
                </p>
            </div>
            <TableTemplate data={data} columns={columns} title={"Tìm kiếm sản phẩm bảo hành"} actions={actions} onSelectedRow={onSelectedRow}/>
        </DefaultLayout>
    );
}

//     + "/" + data.product_name