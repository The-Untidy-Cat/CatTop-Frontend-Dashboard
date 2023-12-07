import { Table, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios";
import { format } from 'date-fns';

const { RangePicker } = DatePicker;

export default function StatisticBody() {
  
    const handleChangeDate = (dates, dateArr) => {
        // if(dateArr[0] != '' && dateArr[1] != ''){
        //     console.log('So sánh: ', (format(new Date('01/12/2023'), 'dd/MM/yyyy') < (format(new Date(dateArr[1]), 'dd/MM/yyyy')) ? 'trong khoảng' : 'ngoài khoảng'));
        // }
        // else{
        //     console.log(format(new Date('01/12/2023'), 'dd/MM/yyyy'))
        //     console.log('chưa nhập đủ');
        // }
        const formattedDate = format(new Date('01/12/2023'), 'dd/MM/yyyy');
        console.log(formattedDate);  // Kết quả: 01/12/2023
    }
    const cols = [
        {
            title: "Trạng thái",
            dataIndex: "state",
            key: "state",
        },
        {
            title: "Tổng số đơn hàng",
            dataIndex: "total_orders",
            key: "total_orders",
        },
        {
            title: "Tổng số sản phẩm",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Doanh thu",
            dataIndex: "revenue",
            key: "revenue",
        },
    ];
    const [records, setRecords] = useState([]);


    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const response = await api.get('/dashboard/orders', {
                    params: {
                        limit: 1000,
                    },
                });

                setRecords(response?.data?.data?.records || []);
                // console.log('records: ', records);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        getAllOrder();
    }, []);

    const orders_data = records.map(record => ({
        id: record.id,
        state: record.state,
        revenue: parseInt(record.total),
        product: record.items.length,
        date: record.created_at,
    }));
    // const orders_data = [
    //     { id: 1, state: 'pending', revenue: 100000, product:3, date: '01/08/2023' },
    //     { id: 2, state: 'confirmed', revenue: 150000, product:1, date: '01/09/2023' },
    //     { id: 3, state: 'pending', revenue: 200000, product:1, date: '01/08/2023' },
    //     { id: 4, state: 'delivered', revenue: 250000, product:2, date: '01/10/2023' },
    //     { id: 5, state: 'pending', revenue: 300000, product:1, date: '01/11/2023' },
    //     { id: 6, state: 'confirmed', revenue: 350000, product:3, date: '01/08/2023' }
    // ]
    const uniqueStatesSet = new Set(orders_data.map(item => item.state));
    const stateArr = [...uniqueStatesSet];

    const orderStatusCount = {};
    const orderRevenue = {};
    const orderProduct = {};

    orders_data.forEach(order => {
        const { state, revenue, product } = order;
        orderStatusCount[state] = (orderStatusCount[state] !== undefined ? (orderStatusCount[state] + 1) : 1);
        orderRevenue[state] = parseInt(orderRevenue[state] !== undefined ? (orderRevenue[state] + revenue) : revenue);
        orderProduct[state] = parseInt(orderProduct[state] !== undefined ? (orderProduct[state] + product) : product);
    });

    let totalAll_Orders = 0;
    let totalAll_Revenue = 0;
    let totalAll_Product = 0;

    stateArr.forEach(state => {
        totalAll_Orders += orderStatusCount[state];
        totalAll_Revenue += orderRevenue[state];
        totalAll_Product += orderProduct[state];
    })
    orderStatusCount['all'] = totalAll_Orders;
    orderRevenue['all'] = totalAll_Revenue;
    orderProduct['all'] = totalAll_Product;
    const dataSource = [
        {
            key: 'tat-ca',
            state: 'Tất cả',
            total_orders: orderStatusCount['all'],
            revenue: orderRevenue['all'],
            product: orderProduct['all'],
        },
        {
            key: 'da-xac-nhan',
            state: 'Đã xác nhận',
            total_orders: orderStatusCount['confirmed'] || 0,
            revenue: orderRevenue['confirmed'] || 0,
            product: orderProduct['confirmed'] || 0
        },
        {
            key: 'dang-van-chuyen',
            state: 'Đang vận chuyển',
            total_orders: orderStatusCount['delivering'] || 0,
            revenue: orderRevenue['delivering'] || 0,
            product: orderProduct['delivering'] || 0
        },
        {
            key: 'da-van-chuyen',
            state: 'Đã vận chuyển',
            total_orders: orderStatusCount['delivered'] || 0,
            revenue: orderRevenue['delivered'] || 0,
            product: orderProduct['delivered'] || 0
        },
        {
            key: 'cho-xu-ly',
            state: 'Chờ xử lý',
            total_orders: orderStatusCount['pending'] || 0,
            revenue: orderRevenue['pending'] || 0,
            product: orderProduct['pending'] || 0
        },
        {
            key: 'ban-thao',
            state: 'Bản thảo',
            total_orders: orderStatusCount['draft'] || 0,
            revenue: orderRevenue['draft'] || 0,
            product: orderProduct['draft'] || 0
        },
        {
            key: 'da-huy',
            state: 'Đã hủy',
            total_orders: orderStatusCount['cancelled'] || 0,
            revenue: orderRevenue['cancelled'] || 0,
            product: orderProduct['cancelled'] || 0
        },
        {
            key: 'hoan-tien',
            state: 'Hoàn tiền',
            total_orders: orderStatusCount['refunded'] || 0,
            revenue: orderRevenue['refunded'] || 0,
            product: orderProduct['refunded'] || 0
        },
        {
            key: 'that-bai',
            state: 'Thất bại',
            total_orders: orderStatusCount['failed'] || 0,
            revenue: orderRevenue['failed'] || 0,
            product: orderProduct['failed'] || 0
        },
    ]


    return (
        <div className="mt-5 flex flex-col gap-4">
            <div>
            <DatePicker.RangePicker
                    format="DD/MM/YYYY"
                    onCalendarChange={handleChangeDate}
                />
            </div>
            <div>
                <Table columns={cols} dataSource={dataSource} />

            </div>
        </div>
    )
}