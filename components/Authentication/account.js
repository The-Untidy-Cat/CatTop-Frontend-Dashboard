import { Button, Descriptions } from "antd";
import { useUser } from "../Provider/AuthProvider";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import { ModalToggle } from "../Modal";

export const AccountBar = () => {
  const { user, logout } = useUser();
  return (
    <div className="w-full h-full max-w-md">
      <div className="flex justify-between items-center gap-2">
        <ModalToggle
          button={{
            type: "link",
            className:
              "flex items-center align-center p-0 text-sm font-medium",
            icon: <FaPen />,
            label: "Sửa hồ sơ",
          }}
        >
          <Button
            type="link"
            className="flex items-center align-center p-0 gap-1 text-sm font-medium"
          >
            <FaPen />Sửa hồ sơ
          </Button>
        </ModalToggle>
        <Button
          type="link"
          className="flex items-center align-center p-0 gap-1 text-sm font-medium text-red-500"
          onClick={logout}
        >
          Đăng xuất<FaSignOutAlt />
        </Button>
      </div>

      <Descriptions
        size="small"
        className="text-gray-900 w-full max-w-md m-0 p-0"
        column={1}
        items={[
          {
            label: "Tên đăng nhập",
            children: user?.username,
          },
          {
            label: "Họ và tên",
            children: user?.last_name + " " + user?.first_name,
          },
          {
            label: "Email",
            children: user?.email,
          },
          {
            label: "Số điện thoại",
            children: user?.phone_number,
          },
          {
            label: "Địa chỉ",
            children: user?.address,
          },
          {
            label: "Ngày tạo",
            children: user?.created_at,
          },
        ]}
      />
    </div>
  );
};
