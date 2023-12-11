import { Collapse } from "antd";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import {MdOutlinePeopleAlt,  MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiShoppingBag} from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

// const NAVBAR_MENU = [
//   {
//     key: "",
//     name: "Đơn hàng",
//     path: "ID",
//   },
// ];

const SIDEBAR_MENU = [
  {
    key: "home",
    name: "Tổng quan",
    path: "/",
    type: "link",
    icon: <AiOutlineHome />,
  },
  {
    key: "separator-1",
    type: "separator",
  },
  {
    key: "order",
    name: "Đơn hàng",
    type: "section",
    icon: <BiShoppingBag />,
    children: [
      {
        key: "order-list",
        name: "Danh sách đơn hàng",
        path: "/orders",
        type: "sub-menu",
      },
      {
        key: "order-statistic",
        name: "Thống kê đơn hàng",
        path: "/orders/statistic",
        type: "sub-menu",
      },
      // {
      //   key: "return-list",
      //   name: "Danh sách đổi trả",
      //   path: "/orders/return",
      //   type: "sub-menu",
      // },
    ],
  },
  {
    key: "customer",
    name: "Khách hàng",
    type: "section",
    icon: <MdOutlinePeopleAlt />,
    children: [
      {
        key: "customer-list",
        name: "Danh sách khách hàng",
        path: "/customers",
        type: "sub-menu",
      }
    ],
  },
  {
    key: "product",
    name: "Sản phẩm",
    type: "section",
    icon: <MdOutlineProductionQuantityLimits />,
    children: [
      {
        key: "product-list",
        name: "Danh sách sản phẩm",
        path: "/products",
        type: "sub-menu",
      },
      {
        key: "brand-list",
        name: "Danh sách thương hiệu",
        path: "/products/brands",
        type: "sub-menu",
      },
    ],
  },
  // {
  //   key: "employee",
  //   name: "Nhân viên",
  //   type: "section",
  //   icon: <FiUser />,
  //   disabled: true,
  //   children: [
  //     {
  //       key: "employee-list",
  //       name: "Danh sách nhân viên",
  //       path: "/employees",
  //       type: "sub-menu",
  //     },
  //   ],
  // },
];

const NavbarMenu = () => {
  return (
    <div className="flex items-center align-center gap-2 ml-2">
      {NAVBAR_MENU?.map((item, index) => (
        <Link
          className="text-gray-500 text-sm font-medium hover:text-primary transition-all duration-300 px-3"
          key={item.key}
          href={item.path}
          disabled={item?.disabled}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const MenuItem = ({ item, activeKey }) => {
  switch (item?.type) {
    case "link":
      return (
        <Link
          className={`flex items-center align-center w-full gap-2 text-sm hover:text-secondary transition-all duration-300 px-3 py-2 font-medium ${
            activeKey === item.key ? "text-primary font-medium" : ""
          }`}
          key={item.key}
          href={item.path}
          disabled={item?.disabled}
        >
          <span className="flex text-primary h-fit">{item.icon}</span>
          {item.name}
        </Link>
      );
    case "separator":
      return (
        <span
          className="flex w-full h-px bg-gray-200 my-1"
          key={item.key}
        ></span>
      );
    case "section":
      return (
        <Collapse
          disabled={item?.disabled}
          items={[
            {
              ...item,
              key: item.key,
              icon: undefined,
              label: (
                <p
                  className={`flex items-center align-center w-full gap-2 text-sm hover:text-secondary transition-all duration-300 px-3 py-2 font-medium ${
                    item?.children?.find((child) => activeKey == child.key)
                      ? "text-primary font-medium"
                      : ""
                  }`}
                >
                  <span className="text-primary flex h-fit">{item.icon}</span>
                  {item.name}
                </p>
              ),
              type: undefined,
              children: item?.children?.map((child) => (
                <MenuItem item={child} key={child.key} activeKey={activeKey} />
              )),
              className:
                "flex flex-wrap items-center align-center w-full h-fit transition-all duration-300",
            },
          ]}
          className="w-full h-fit border-0 drop-sahdow-none bg-transparent p-0 m-0 "
          ghost
          defaultActiveKey={
            item?.children?.find((child) => child.key == activeKey)
              ? [item.key]
              : null
          }
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <span className="pr-4 text-xs">
              {isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </span>
          )}
        />
      );
    case "sub-menu":
      return (
        <Link
          className={`flex items-center align-center w-full gap-2 transition-all duration-300 pl-9 pr-3 py-1 `}
          key={item.key}
          href={item.path}
          disabled={item?.disabled}
        >
          <span
            className={`w-full text-gray-600 hover:text-secondary ${
              activeKey === item.key ? "text-primary font-medium" : ""
            }`}
          >
            {item.name}
          </span>
        </Link>
      );
    default:
      return item?.children;
  }
};

const SidebarMenu = ({ menu = SIDEBAR_MENU, activeKey = null }) => {
  return (
    <div className="flex flex-col gap-0.5 h-fit w-full">
      {menu?.map((item, index) => {
        return <MenuItem item={item} key={item.key} activeKey={activeKey} />;
      })}
    </div>
  );
};

export { NavbarMenu, SidebarMenu };
