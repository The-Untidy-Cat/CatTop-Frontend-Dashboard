import { getStatistic } from "@/services/order";
import { DatePicker, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function OrderStatistic() {
  const [date, setDate] = useState([dayjs().startOf("month"), dayjs()]); // [start, end]
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getStatistic({ dateRange: date });
      setData(response);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [date]);

  return (
    <>
      <div className="flex flex-col gap-1 bg-white p-5 w-full h-fit min-h-full border rounded">
        {/* <h2 className="text-lg font-semibold shrink-0">Thống kê đơn hàng</h2> */}
        <RangePicker
          defaultValue={[dayjs().startOf("month"), dayjs()]}
          onChange={(date, dateString) => setDate(date)}
          className="w-full"
          format={"DD/MM/YYYY"}
        />
        <Tabs
          defaultActiveKey="pending"
          className="p-0"
          items={[
            {
              key: "all",
              label: "Tất cả",
            },
            {
              key: "pending",
              label: "Chờ xử lý",
            },
            {
              key: "confirmed",
              label: "Đã xác nhận",
            },
            {
              key: "delivering",
              label: "Đang vận chuyển",
            },
            {
              key: "delivered",
              label: "Đã giao",
            },
            {
              key: "cancelled",
              label: "Đã hủy",
            },
            {
              key: "failed",
              label: "Thất bại",
            },
            {
              key: "refunded",
              label: "Hoàn tiền"
            },
            {
              key: "draft",
              label: "Nháp",
            },
          ]}
        />
      </div>
    </>
  );
}
