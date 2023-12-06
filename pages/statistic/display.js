import { Table, DatePicker } from "antd";
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

    return (
        <div className="mt-5 flex flex-col gap-4 overflow-x-auto">
            <div className="flex gap-4">
                <div>
                    <DatePicker 
                        picker="month" 
                        format="MM/YYYY" 
                        placeholder="Chọn tháng-năm"
                        className="w-44"/>
                </div>
            </div>
            <div>
                <Table columns={cols} />
            </div>
        </div>
    )
}