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
      <div class="block border px-10 py-10">
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
          <Tabs defaultActiveKey="1" items={items} />
        </div>

        <div class="grid grid-flow-col auto-cols-auto	">
          <div>
            <p class="font-bold text-center py-2">#</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2">Order ID</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2">Product Name</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2" href="#">Customer_ID</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2" href="#">Address</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2">Date</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2">Price</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
          <div>
            <p class="font-bold text-center	py-2">Status</p>
            <p class="text-center	py-2">1</p>
            <p class="text-center	py-2">2</p>
            <p class="text-center	py-2">3</p>
            <p class="text-center	py-2">4</p>
            <p class="text-center	py-2">5</p>
            <p class="text-center	py-2">6</p>
            <p class="text-center	py-2">7</p>
          </div>
        </div>

      </div>
    </DefaultLayout>
  );
}
