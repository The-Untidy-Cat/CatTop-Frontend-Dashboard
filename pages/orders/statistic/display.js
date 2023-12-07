import TableView from "@/components/View/table";
import { Table, DatePicker } from "antd";
import { getAllOrder, getUnlimitAllOrder } from "@/services/order";
import { useState, useEffect } from "react";
import { searchRead } from "@/services/search_read";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function StatisticBody() {
    const cols = [
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Tổng số đơn hàng",
            dataIndex: "total_orders",
            key: "total_orders",
        },
        {
            title: "Tổng số sản phẩm",
            dataIndex: "total_products",
            key: "total_products",
        },
        {
            title: "Doanh thu",
            dataIndex: "revenue",
            key: "revenue",
        },
    ];

    const [loading, setLoading] = useState(false);
    // const [keyword, setKeyword] = useState(null);
    // const [offset, setOffset] = useState(0);
    const [orders, setOrders] = useState()

    const getData = async (
        startDate = dayjs().startOf('month'),
        endDate = dayjs()
    ) => {

        setLoading(true);
        try {
            const numDays = endDate.diff(startDate, 'day') + 1

            // Create array to hold dates
            const rangeDate = ["||"]

            // Iterate one day at a time with for loop
            for (let i = 0; i < numDays; i++) {
                const current = startDate.add(i, 'day')
                rangeDate.push(
                    ["created_at", "like", `%${current.format("YYYY-MM-DD")}%`]
                )
            }
            console.log("- Xuất 1:")
            console.log(rangeDate)
            const response = await getUnlimitAllOrder(
                {
                    domain: [
                        ...rangeDate
                    ],
                    fields: ["id", "state"]
                }
            );
            setOrders(response || [])
            console.log("- Xuất 2:")
            console.log(response)

        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const handleRangePickerChange = (values) => {
        getData(values?.[0], values?.[1])
    }

    const getTotalOrder = (state) => {
        let d = 0;
        orders?.records?.map(
            (item) => {
                if (item?.state === state)
                    d++;
            }
        )
        return d;
    }
    const getTotalProduct = (state) => {
        let d = 0;
        if (state === "") {
            orders?.records?.map(
                (item) => { d = d + item.items.length }
            )
        }
        else {
            orders?.records?.map(
                (item) => {
                    if (item?.state === state)
                        d = d + item.items.length
                }
            )
        }
        return d;
    }
    const getRevenue = (state) => {
        let total = 0;
        if (state === "") {
            orders?.records?.map(
                (item) => { total = total + Number(item.total) }
            )
        }
        else {
            orders?.records?.map(
                (item) => {
                    if (item?.state === state)
                        total = total + Number(item.total)
                }
            )
        }
        return total;
    }

    const data = [
        {
            key: '1',
            status: 'Tất cả',
            total_orders: orders?.length,
            total_products: getTotalProduct(""),
            revenue: getRevenue(""),
        },
        {
            key: '2',
            status: 'Đã xác nhận',
            total_orders: getTotalOrder("confirmed"),
            total_products: getTotalProduct("confirmed"),
            revenue: getRevenue("confirmed"),
        },
        {
            key: '3',
            status: 'Đang vận chuyển',
            total_orders: getTotalOrder("delivering"),
            total_products: getTotalProduct("delivering"),
            revenue: getRevenue("delivering"),
        },
        {
            key: '4',
            status: 'Chờ xử lý',
            total_orders: getTotalOrder("pending"),
            total_products: getTotalProduct("pending"),
            revenue: getRevenue("pending"),
        },
        {
            key: '5',
            status: 'Nháp',
            total_orders: getTotalOrder("draft"),
            total_products: getTotalProduct("draft"),
            revenue: getRevenue("draft"),
        },
        {
            key: '6',
            status: 'Đã hủy',
            total_orders: getTotalOrder("cancelled"),
            total_products: getTotalProduct("cancelled"),
            revenue: getRevenue("cancelled"),
        },
        {
            key: '7',
            status: 'Đã hoàn tiền',
            total_orders: getTotalOrder("refunded"),
            total_products: getTotalProduct("refunded"),
            revenue: getRevenue("refunded"),
        },
        {
            key: '8',
            status: 'Thất bại',
            total_orders: getTotalOrder("failed"),
            total_products: getTotalProduct("failed"),
            revenue: getRevenue("failed"),
        },
    ]

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="mt-5 flex flex-col gap-4">
            <div>
                <RangePicker
                    defaultValue={[
                        dayjs().startOf("month"),
                        dayjs()
                    ]}
                    format={"DD/MM/YYYY"}
                    onChange={handleRangePickerChange}
                    allowClear={false}
                />
            </div>
            <div>
                <Table dataSource={data} columns={cols} loading={loading} />
            </div>
        </div>
    )
}