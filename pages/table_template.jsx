import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

export const TableTemplate = (data, columns, title) => {
    return (
        <DefaultLayout>
            <div class="float-left">
                <p>
                    <span class="text-2xl font-bold mr-3">{title}</span>
                    <span class="font-bold text-slate-500	">15 {title} được tìm thấy</span>
                </p>
            </div>


            {/* //Category */}
            <div class="block border px-10 py-10">
                {/* //Search bar */}
                <div class="inline-block w-full">
                    <div class="relative float-left w-80 mb-5">
                        <input
                            class="border w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs focus:outline-none"
                            type="search"
                            name="search"
                            placeholder="Tìm kiếm"
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
                    <button class="rounded-lg w-24 h-9 mr-7">
                        <p>
                            <span><FaPlus class="text-white mr-2 w-2.5 align-middle	" /></span>
                            <span class="text-white font-bold align-middle		">Thêm</span>
                        </p>
                    </button>

                    <button class="rounded-lg w-24 h-9 bg-yellow-400">
                        <p>
                            <span><RiPencilFill class="text-white mr-2 align-middle	" /></span>
                            <span class="text-white font-bold align-middle		">Sửa</span>
                        </p>
                    </button>
                </div>
                <div>
                    <Table dataSource={data} columns={columns} />
                </div>
            </div>
        </DefaultLayout>
    );
}