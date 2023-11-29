import DefaultLayout from "@/components/Layout";
import { DatePicker, Divider, Tabs, Pagination, Table, Row, Col, Statistic, Button } from "antd";
import { App } from "@/pages/test.js";
import { LikeOutlined } from '@ant-design/icons';
import { FaShoppingBag, FaUserPlus } from "react-icons/fa";
import { MdAttachMoney, MdOutlineProductionQuantityLimits } from "react-icons/md";


export default function Home() {
  return (
    <DefaultLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Khách hàng" value={1128} prefix={<FaUserPlus />} />
        </Col>
        <Col span={6}>
          <Statistic title="Đơn hàng" value={1128} prefix={<FaShoppingBag />} />
        </Col>
        <Col span={6}>
          <Statistic title="Sản phẩm" value={1128} prefix={<MdOutlineProductionQuantityLimits />} />
        </Col>
        <Col span={6}>
          <Statistic title="Doanh thu" value={1128} prefix={<MdAttachMoney />} />
        </Col>
      </Row>
      <Divider />
      {/* <Button type="primary">Tạo đơn hàng mới</Button>  */}
    </DefaultLayout>
  );
}
