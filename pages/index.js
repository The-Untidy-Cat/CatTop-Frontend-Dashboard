import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { DatePicker, Divider, Tabs, Pagination } from "antd";
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
            <Divider />
            <p class="text-center	py-2 my-4">1</p>
            <Divider />
            <p class="text-center	py-2 my-4">2</p>
            <Divider />
            <p class="text-center	py-2 my-4">3</p>
            <Divider />
            <p class="text-center	py-2 my-4">4</p>
            <Divider />
            <p class="text-center	py-2 my-4">5</p>
            <Divider />
            <p class="text-center	py-2 my-4">6</p>
            <Divider />
            <p class="text-center	py-2 my-4">7</p>
            <Divider />
            <p class="text-center	py-2 my-4">8</p>
            <Divider />
            <p class="text-center	py-2 my-4">9</p>
            <Divider />
            <p class="text-center	py-2 my-4">10</p>
            <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2">Order ID</p>
            <Divider />
            <p class="text-center	py-2 my-4">1</p>
            <Divider />
            <p class="text-center	py-2 my-4">2</p>
            <Divider />
            <p class="text-center	py-2 my-4">3</p>
            <Divider />
            <p class="text-center	py-2 my-4">4</p>
            <Divider />
            <p class="text-center	py-2 my-4">5</p>
            <Divider />
            <p class="text-center	py-2 my-4">6</p>
            <Divider />
            <p class="text-center	py-2 my-4">7</p>
            <Divider />
            <p class="text-center	py-2 my-4">8</p>
            <Divider />
            <p class="text-center	py-2 my-4">9</p>
            <Divider />
            <p class="text-center	py-2 my-4">10</p>
            <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2">Product Name</p>
            <Divider />
            <p class="text-center	py-2 my-4">1</p> <Divider />
            <p class="text-center	py-2 my-4">2</p> <Divider />
            <p class="text-center	py-2 my-4">3</p> <Divider />
            <p class="text-center	py-2 my-4">4</p> <Divider />
            <p class="text-center	py-2 my-4">5</p> <Divider />
            <p class="text-center	py-2 my-4">6</p> <Divider />
            <p class="text-center	py-2 my-4">7</p> <Divider />
            <p class="text-center	py-2 my-4">8</p> <Divider />
            <p class="text-center	py-2 my-4">9</p> <Divider />
            <p class="text-center	py-2 my-4">10</p> <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2" href="#">Customer_ID</p> <Divider />
            <p class="text-center	py-2 my-4">1</p> <Divider />
            <p class="text-center	py-2 my-4">2</p> <Divider />
            <p class="text-center	py-2 my-4">3</p> <Divider />
            <p class="text-center	py-2 my-4">4</p> <Divider />
            <p class="text-center	py-2 my-4">5</p> <Divider />
            <p class="text-center	py-2 my-4">6</p> <Divider />
            <p class="text-center	py-2 my-4">7</p> <Divider />
            <p class="text-center	py-2 my-4">8</p> <Divider />
            <p class="text-center	py-2 my-4">9</p> <Divider />
            <p class="text-center	py-2 my-4">10</p> <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2" href="#">Address</p> <Divider />
            <p class="text-center	py-2 my-4">1</p> <Divider />
            <p class="text-center	py-2 my-4">2</p> <Divider />
            <p class="text-center	py-2 my-4">3</p> <Divider />
            <p class="text-center	py-2 my-4">4</p> <Divider />
            <p class="text-center	py-2 my-4">5</p> <Divider />
            <p class="text-center	py-2 my-4">6</p> <Divider />
            <p class="text-center	py-2 my-4">7</p> <Divider />
            <p class="text-center	py-2 my-4">8</p> <Divider />
            <p class="text-center	py-2 my-4">9</p> <Divider />
            <p class="text-center	py-2 my-4">10</p> <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2">Date</p> <Divider />
            <p class="text-center	py-2 my-4">1</p> <Divider />
            <p class="text-center	py-2 my-4">2</p> <Divider />
            <p class="text-center	py-2 my-4">3</p> <Divider />
            <p class="text-center	py-2 my-4">4</p> <Divider />
            <p class="text-center	py-2 my-4">5</p> <Divider />
            <p class="text-center	py-2 my-4">6</p> <Divider />
            <p class="text-center	py-2 my-4">7</p> <Divider />
            <p class="text-center	py-2 my-4">8</p> <Divider />
            <p class="text-center	py-2 my-4">9</p> <Divider />
            <p class="text-center	py-2 my-4">10</p> <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2">Price</p> <Divider />
            <p class="text-center	py-2 my-4">1</p> <Divider />
            <p class="text-center	py-2 my-4">2</p> <Divider />
            <p class="text-center	py-2 my-4">3</p> <Divider />
            <p class="text-center	py-2 my-4">4</p> <Divider />
            <p class="text-center	py-2 my-4">5</p> <Divider />
            <p class="text-center	py-2 my-4">6</p> <Divider />
            <p class="text-center	py-2 my-4">7</p> <Divider />
            <p class="text-center	py-2 my-4">8</p> <Divider />
            <p class="text-center	py-2 my-4">9</p> <Divider />
            <p class="text-center	py-2 my-4">10</p> <Divider />
          </div>
          <div>
            <p class="font-bold text-center	py-2">Status</p>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full my-4 bg-green-100 font-bold text-green-500	">
              Complete
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-green-100 font-bold text-green-500	">
              Complete
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-amber-100	 font-bold text-amber-500	">
              Pending
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-green-100 font-bold text-green-500	">
              Complete
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-red-100 font-bold text-red-500	">
              Cancel
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-green-100 font-bold text-green-500	">
              Complete
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-green-100 font-bold text-green-500	">
              Complete
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-red-100 font-bold text-red-500	">
              Cancel
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-amber-100	 font-bold text-amber-500	">
              Pending
            </div>
            <Divider />
            <div class="text-center	py-2 my-4 rounded-full bg-amber-100	 font-bold text-amber-500	">
              Pending
            </div>
            <Divider />
          </div>
        </div>

        <div>
          <p class="font-bold float-left">
            Showing 1 to 10 of 100 entries
          </p>

          <div class="float-right">
            <Pagination defaultCurrent={1} total={100} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
