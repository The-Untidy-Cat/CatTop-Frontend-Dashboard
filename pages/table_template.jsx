import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";


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
                    {action?.map((item) => {
                        return (
                            <Button type={item.type} class="rounded-lg w-24 h-9 mr-7" onClick={item.onClick} icon={item.onClick}>
                                {item.text}
                            </Button>
                        )
                    })}

                </div>
                <div>
                    <Table dataSource={data} columns={columns} />
                </div>
            </div>
        </div>
    );
}