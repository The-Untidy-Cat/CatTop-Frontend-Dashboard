import { DatePicker, Empty, Statistic, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { color } from "@/theme/theme.config";
import { getStatistic } from "@/services/product";
import Link from "next/link";
import { formatCurrency } from "@/utils/currency";

const { RangePicker } = DatePicker;

export default function ProductStatistic() {
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
    <div className="flex flex-col gap-1 bg-white p-5 w-full h-full min-h-full border rounded">
        <h2 className="text-lg font-semibold shrink-0">
          Top 5 sản phẩm bán chạy
        </h2>
        <RangePicker
          defaultValue={[dayjs().startOf("month"), dayjs()]}
          onChange={(date, dateString) => setDate(date)}
          className="w-full max-w-sm "
          format={"DD/MM/YYYY"}
        />
        <div className="h-full w-full overflow-hidden">
          <Table
            dataSource={data.map((item) => ({
              ...item,
              key: item.id,
            }))}
            columns={[
              {
                title: "Sản phẩm",
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                  <Link href={`/products/${record.id}`}>
                    {record?.product_name}
                  </Link>
                ),
              },
              {
                title: "Biến thể",
                dataIndex: "variant",
                key: "variant",
                render: (text, record) => record?.variant_name,
              },
              {
                title: "Số đơn",
                dataIndex: "total_order",
                key: "order",
                width: 70,
              },
              {
                title: "Số SP",
                dataIndex: "total_amount",
                key: "amount",
                width: 70,
              },
              {
                title: "Doanh thu",
                dataIndex: "total_sale",
                key: "revenue",
                render: (text) => formatCurrency(Number(text)),
              },
            ]}
            scroll={{ x: "max-content" }}
            loading={loading}
            className="overflow-hidden overflow-x-auto"
          />
        </div>
      </div>
  );
}
