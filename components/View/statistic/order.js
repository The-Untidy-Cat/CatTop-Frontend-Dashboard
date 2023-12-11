import { getStatistic } from "@/services/order";
import { DatePicker, Empty, Statistic, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ORDER_STATE } from "@/app.config";
import { color } from "@/theme/theme.config";

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
          className="w-full max-w-sm "
          format={"DD/MM/YYYY"}
        />
        <div className="grid 3xl:grid-cols-2 gap-2 w-full h-full py-2">
          {data?.length ? (
            data.map((item) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 col-span-1">
                <p className="font-semibold md:col-span-3">
                  {ORDER_STATE[item?.state]}
                </p>
                <Statistic
                  title="Đơn hàng"
                  value={Number(item?.total_order)}
                  className="border rounded p-2 font-medium"
                  valueStyle={{
                    color: color.primary,
                    fontWeight: 600,
                    fontSize: "1.2rem",
                  }}
                />
                <Statistic
                  title="Doanh thu"
                  value={Number(item?.total_sale)}
                  className="border rounded p-2 font-medium"
                  valueStyle={{
                    color: color.primary,
                    fontWeight: 600,
                    fontSize: "1.2rem",
                  }}
                />
                <Statistic
                  title="Sản phẩm"
                  value={Number(item?.total_amount)}
                  className="border rounded p-2  font-medium"
                  valueStyle={{
                    color: color.primary,
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    wordBreak: 'break-all'
                  }}
                />
              </div>
            ))
          ) : (
            <Empty description="Không có thông tin" className="col-span-2 h-full flex flex-col items-center justify-center" />
          )}
        </div>
      </div>
    </>
  );
}
