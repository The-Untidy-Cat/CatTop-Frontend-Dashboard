import { formatCurrency, readMoney } from "@/utils/currency";
import { Image, Spin } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getOrder } from "@/services/order";
import { useUser } from "@/components/Provider/AuthProvider";
import { PAYMENT_METHOD, SHOPPING_METHOD } from "@/app.config";

// Create Document Component
const Invoice = ({ order }) => (
  <div className="w-full h-full p-5">
    <div className="flex items-center align-center gap-4">
      <Image src="/logo.png" width={50} height={50} preview={false} />
      <div className="flex flex-col justify-center gap-0.5">
        <p className="text-sm uppercase font-semibold">
          công ty tnhh mtv cattop
        </p>
        <p className="text-xs">KP6, P. Linh Trung, TP. Thủ Đức, TP.HCM</p>
        <p className="text-xs">MST: 0315 545 545</p>
      </div>
    </div>
    <h1 className="text-2xl font-bold text-center uppercase my-3">
      Hoá đơn bán lẻ
    </h1>
    <p className="text-xs text-center mb-5">
      Mã đơn hàng: <span className="text-sm font-bold">{order?.id}</span>
    </p>
    <div className="grid grid-cols-2 gap-2 w-full py-3">
      <p className="text-xs">
        <span className="font-semibold">Tên khách hàng: </span>
        {String(
          order?.customer?.last_name + " " + order?.customer?.first_name
        ).trim()}
      </p>
      <p className="text-xs">
        <span className="font-semibold">Số điện thoại: </span>
        {order?.customer?.phone_number}
      </p>
      <p className="text-xs">
        <span className="font-semibold">Hình thức mua hàng: </span>
        {SHOPPING_METHOD[order?.shopping_method]}
      </p>
      <p className="text-xs">
        <span className="font-semibold">Hình thức thanh toán: </span>
        {PAYMENT_METHOD[order?.payment_method]}
      </p>
    </div>
    <table className="w-full text-xs border border-black" border={1}>
      <thead>
        <tr className="border border-black">
          <th className="border border-black">STT</th>
          <th className="border border-black">Tên sản phẩm và phân loại</th>
          <th className="border border-black">Đơn giá</th>
          <th className="border border-black">Số lượng</th>
          <th className="border border-black">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        {order?.items?.map((item, index) => (
          <tr key={index}>
            <td className="border border-black text-center">{index + 1}</td>
            <td className="border border-black">
              {item?.variant?.product?.name}
              <br />
              {item?.variant?.name}
            </td>
            <td className="border border-black text-center">
              {formatCurrency(item?.sale_price) }
            </td>
            <td className="border border-black text-center">{item?.amount}</td>
            <td className="border border-black text-center">{formatCurrency(item?.total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border border-black">
          <td className="border border-black text-center" colSpan={4}>
            Tổng tiền
          </td>
          <td className="border border-black text-center">
            {formatCurrency(order?.total ?? 0)} VND
            <br />
            <span className="text-xs italic">
              {readMoney(order?.total ?? 0)}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
    <p className="text-xs float-right italic mt-2">
      Ngày {new Date(order?.created_at ?? null).toLocaleDateString()}
    </p>
    <div className="grid grid-cols-2 gap-2 w-full h-28 py-3">
      <div className="flex flex-col items-center align-center justify-between gap-0.5">
        <p className="text-sm font-semibold">Người mua hàng</p>
        <p className="text-xs">
          {String(
            order?.customer?.last_name + " " + order?.customer?.first_name
          ).trim()}
        </p>
      </div>
      <div className="flex flex-col items-center align-center justify-between gap-0.5">
        <p className="text-sm font-semibold">Người bán hàng</p>
        <p className="text-xs"></p>
      </div>
    </div>
  </div>
);

export default function App() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    getOrder(id)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        window.close();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (order && !loading) {
      window.print();
      window.close();
    }
  }, [order, loading]);
  return (<>{ !loading ? <Invoice order={order} /> : "Đang tải"}</>
    
  );
}
