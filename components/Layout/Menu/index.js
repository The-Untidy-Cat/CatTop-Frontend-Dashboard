import { Collapse } from "antd";
import Link from "next/link";
import { AiOutlineHome, AiFillShopping } from "react-icons/ai";
import {MdOutlinePeopleAlt} from "react-icons/md";
import { BiRightArrow, BiDownArrow, BiShoppingBag } from "react-icons/bi";

const NAVBAR_MENU = [
  {
    key: "home",
    name: "Home",
    path: "/",
  },
  {
    key: "chat",
    name: "Chat",
    path: "#",
  },
  {
    key: "order",
    name: "Đơn hàng",
    path: "#",
  },
];

const SIDEBAR_MENU = [
  {
    key: "home",
    name: "Home",
    path: "/",
    type: "link",
    icon: <AiOutlineHome />,
  },
  {
    key: "separator-1",
    type: "separator",
  },
  {
    key: "Đơn hàng",
    name: "Đơn hàng",
    type: "section",
    icon: <BiShoppingBag />,
    children: [
      {
        key: "Danh sách đơn hàng",
        name: "Danh sách đơn hàng",
        path: "/",
        type: "sub-menu",
      },
      {
        key: "Thống kê đơn hàng",
        name: "Thống kê đơn hàng",
        path: "/",
        type: "sub-menu",
      }
    ],
  },
  {
    key: "Khách hàng",
    name: "Khách hàng",
    type: "section",
    icon: <MdOutlinePeopleAlt />,
    children: [
      {
        key: "Danh sách khách hàng",
        name: "Danh sách khách hàng",
        path: "/",
        type: "sub-menu",
      }
    ],
  },
];

const NavbarMenu = () => {
  return (
    <div className="flex items-center align-center gap-2 ml-2">
      {NAVBAR_MENU?.map((item, index) => (
        <Link
          className="text-gray-500 text-sm font-medium hover:text-primary transition-all duration-300 px-3"
          key={item.key}
          href={item.path}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const MenuItem = ({ item }) => {
  switch (item.type) {
    case "link":
      return (
        <Link
          className="flex items-center align-center w-full gap-2 text-sm hover:text-primary transition-all duration-300 px-5 py-3 font-normal text-gray-900"
          key={item.key}
          href={item.path}
        >
          <span className="flex text-primary text-lg  h-fit">{item.icon}</span>
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
          items={[
            {
              ...item,
              icon: undefined,
              label: (
                <p className="flex items-center align-center w-full gap-2 text-sm hover:text-primary transition-all duration-300 px-5 py-3 font-normal text-gray-900">
                  <span className="text-primary text-lg flex h-fit">
                    {item.icon}
                  </span>
                  {item.name}
                </p>
              ),
              type: undefined,
              children: item?.children?.map((child) => (
                <MenuItem item={child} key={child.key} />
              )),
              className:
                "flex flex-wrap items-center align-center w-full h-fit hover:text-primary transition-all duration-300",
            },
          ]}
          className="w-full h-fit border-0 drop-sahdow-none bg-transparent p-0 m-0 "
          ghost
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <span className="pr-4">{isActive ? <BiDownArrow /> : <BiRightArrow />}</span>
          )}
        />
      );
    case "sub-menu":
      return (
        <Link
          className="flex items-center align-center w-full gap-2 hover:bg-primary/[.1] transition-all duration-300 pl-12 pr-3 py-1"
          key={item.key}
          href={item.path}
        >
          <span className="w-full text-gray-600 hover:text-primary">
            {item.name}
          </span>
        </Link>
      );
  }
};

const SidebarMenu = () => {
  return (
    <div className="flex flex-col h-fit w-full">
      {SIDEBAR_MENU?.map((item, index) => {
        return <MenuItem item={item} key={item.key} />;
      })}
    </div>
  );
};

export { NavbarMenu, SidebarMenu };
