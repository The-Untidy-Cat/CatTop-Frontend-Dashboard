import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Tabs } from "antd";
export default function Home() {
  const items = [
    {
      key: '1',
      label: 'Tất cả đơn hàng',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Đã hoàn thành',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Đang giao hàng',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Đã hủy',
      children: 'Content of Tab Pane 4',
    },
  ];
  return (
    <DefaultLayout>
      {/* //Search bar */}
      <div class="relative w-80 mb-7">
        <input
          class="border w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs font-bold focus:outline-none"
          type="search"
          name="search"
          placeholder="Search Product"

        />

        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
          <AiOutlineSearch class="text-slate-400 text-lg" />
        </button>
      </div>

      {/* //Category */}
      <div class="block border">
        <div class="inline-block w-full">
          <div class="float-left">
            <p>
              <span class="text-2xl font-bold mr-3">Order</span>
              <span class="font-bold text-slate-500	">15 Orders found</span>
            </p>
          </div>
          <div class="float-right">
             <DatePicker />
          </div>
        </div>

        <div>
          <Tabs defaultActiveKey="1" items={items}/>
        </div>

        <div class="border p-1 flex rounded-lg">
          <div>
            <img class="w-16 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCLZkAAraT0TVTHzGz4kYUfP4eYb8Ljfvew&usqp=CAU" />
          </div>
        </div>

        <div class="border p-1 flex rounded-lg">
          <div>
            <img class="w-16 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCLZkAAraT0TVTHzGz4kYUfP4eYb8Ljfvew&usqp=CAU" />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
