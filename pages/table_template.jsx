import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination, Table, Button, Form, Input } from "antd";
import { App } from "@/pages/test"
import { ModalToggle } from "@/components/Modal";


export default function TableTemplate({ data, columns, title, actions, onSelectedRow }) {
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

                <div class="flex flex-wrap gap-2 justify-start items-center align-center p-5">
                    {actions.map((action) => {
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
                    <Table dataSource={data} columns={columns} onRow={(data, index) => {
                        return {
                            onClick: () => {
                                onSelectedRow(data)
                            }
                        }
                    }} />
                </div>
            </div>
        </div>
    );
}