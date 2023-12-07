import DefaultLayout from "@/components/Layout";
import { FaPlus } from "react-icons/fa";
import TableView from "../../components/View/table";

import ReturnForm from "@/pages/return/form";
import { useRouter } from "next/router";

const prod_data = [
    {
        id: '1',
        name: 'Dell Inspiron 16 5630',
        brand: 'Dell',
        cst_id: '1001',
        reason: 'Sản phẩm bị lỗi âm thanh',
        type: 'Thay sản phẩm mới'
    },
    {
        id: '4',
        name: 'Lenovo ThinkPad X1 Carbon Gen 11',
        brand: 'Lenovo',
        cst_id: '1002',
        reason: 'Máy không đúng mô tả',
        type: 'Hoàn tiền'
    },
  ];
  
  const cols = [
    {
        title: "#",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Mã khách hàng",
        dataIndex: "cst_id",
        key: "cst_id",
      },
      {
        title: "Lý do đổi trả",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Loại đổi trả",
        dataIndex: "type",
        key: "type",
      },
  ];
  
export default function brandList() {
    const router = useRouter();

    const selectedRowFunc = (data) => {
      router.push("");
    };
  
  const actions = [
    {
      key: "add",
      buttonLabel: "Thêm",
      buttonType: "primary",
      buttonIcon: <FaPlus />,
      title: "Thêm mới",
      children: <ReturnForm />,
    },
  ];
  

  return (
    <DefaultLayout
      title={"Đổi trả"}
      breadcrumb={[
        {
          href: "/return",
          title: "Đổi trả",
        },
      ]}
    >
      <TableView
        title="Đổi trả"
        actions={actions}
        table={{
          data: prod_data,
          columns: cols,
          onSelectedRow: selectedRowFunc
        }}
      />
    </DefaultLayout>
  );
}
