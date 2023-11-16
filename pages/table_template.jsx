import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Button, Form, Input } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { App } from "@/pages/test"
import { ModalToggle } from "@/components/Modal";
const NewCustomerForm = () => {
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
                    <p className="m-0">Họ</p>
                    <Form.Item
                        name="last_name"
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
                <div className="flex flex-col gap-2 w-2/3">
                    <p className="m-0">Tên</p>
                    <Form.Item
                        name="first_name"
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

            <p className="m-0">Email</p>
            <Form.Item
                label=""
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Email không hợp lệ!",
                    },
                ]}
                className="m-0"
            >
                <Input />
            </Form.Item>
            <p className="m-0">Số điện thoại</p>
            <Form.Item
                label=""
                name="phone_number"
                rules={[
                    {
                        required: true,
                        pattern:
                            /(0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})/,
                        message: "Số điện thoại không hợp lệ!",
                    },
                ]}
                className="m-0"
            >
                <Input />
            </Form.Item>
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
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );
};

const acitons = [
    {
        key: "add",
        buttonLabel: "Thêm",
        buttonType: "primary",
        // buttonIcon: <AiFillPlusCircle />,
        title: "Thêm mới",
        children: <NewCustomerForm />,
        modalProps: {
            centered: true,
        },
    },
    {
        key: "edit",
        buttonLabel: "Sửa",
        buttonType: "default",
        // buttonIcon: <AiFillPlusCircle />,
        title: "Sửa",
        children: <NewCustomerForm />,
        modalProps: {
            centered: true,
        },
    },
];

export default function TableTemplate({ data, columns, title, action }) {
    return (
        <div>
            {/* //Category */}
            <div class="block border px-10 py-10">
                {/* //Search bar */}
                <div class="inline-block w-full">
                    <div class="relative float-left w-80 mb-5">
                        <input
                            class="border w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs focus:outline-none"
                            type="search"
                            name="search"
                            placeholder={title}
                        />

                        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                            <AiOutlineSearch class="text-slate-400 text-lg" />
                        </button>
                    </div>
                    <div class="float-right">
                        <DatePicker />
                    </div>
                </div>

                <div class="inline-block w-full">
                    {acitons.map((action) => {
                        return (
                            <ModalToggle
                                {...action.modalProps}
                                buttonIcon={action.buttonIcon}
                                buttonLabel={action.buttonLabel}
                                buttonType={action.buttonType}
                                title={action.title}
                                key={action.key}
                            >
                                {action.children}
                            </ModalToggle>
                        );
                    })}


                </div>
                <div>
                    <Table dataSource={data} columns={columns} />
                </div>
            </div>
        </div>
    );
}