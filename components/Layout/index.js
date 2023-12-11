import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { NavbarMenu, SidebarMenu } from "./Menu";
import { Avatar, Breadcrumb, Button, Drawer, Image } from "antd";
import Head from "next/head";
import { FaUser } from "react-icons/fa";
import { AccountBar } from "../Authentication/account";
import { useUser } from "../Provider/AuthProvider";

const DefaultLayout = ({
  children,
  title,
  breadcrumb = [],
  activeKey = null,
}) => {
  const { user } = useUser();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  return (
    <>
      <Head>
        <title>{title ? `${title} | Dashboard` : "CatTop Dashboard"}</title>
      </Head>
      <main className="flex flex-col bg-gray-100/[.3] h-full w-full over-hidden m-0 p-0 gap-1">
        <header className="flex w-full h-fit border-b bg-white justify-between items-center align-center px-3 shrink-0 grow-0">
          <nav className="flex items-center align-center gap-2 h-12 ">
            <Button
              type="text"
              icon={!openSidebar ? <MdOutlineMenu /> : <MdOutlineClose />}
              onClick={() => setOpenSidebar(!openSidebar)}
              className="text-xl text-gray-600 md:hidden"
            />
            <Link
              href="/"
              className="flex items-center align-center gap-3 font-semibold text-lg text-primary m-0 p-0 border-b-2 border-primary h-full"
            >
              <Image
                src="/logo.png"
                alt="logo"
                className="w-8"
                preview={false}
              />
              CatTop Dashboard
            </Link>
            {/* <NavbarMenu /> */}
          </nav>
          <div className="flex items-center align-center gap-2 h-12">
            <Button
              type="link"
              className="flex items-center align-center p-0 gap-1 text-sm font-medium"
              onClick={() => setOpenAccount(!openAccount)}
            >
              <span className="hidden md:block">{user?.username}</span>
              <FaUser className="text-lg" />
            </Button>
            <Drawer
              title="Người dùng"
              placement="right"
              open={openAccount}
              onClose={() => setOpenAccount(!openAccount)}
              classNames={{
                body: "px-5 py-2",
              }}
            >
              <AccountBar />
            </Drawer>
          </div>
        </header>
        <div className="relative flex w-full h-full overflow-hidden bg-transparent">
          <div className="hidden md:flex w-60 items-start align-center gap-2 h-full bg-white border-r overflow-y-auto shrink-0">
            <SidebarMenu activeKey={activeKey} />
          </div>
          <Drawer
            placement="left"
            open={openSidebar}
            onClose={() => setOpenSidebar(!openSidebar)}
            classNames={{
              body: "p-0",
            }}
            className="md:hidden w-full"
          >
            <SidebarMenu activeKey={activeKey} />
          </Drawer>
          <div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto bg-transparent">
            <div className="absolute flex flex-col w-full h-fit min-h-full p-5 gap-2 md:px-8 bg-transparent">
              <Breadcrumb
                separator=">"
                items={[
                  {
                    title: (
                      <Link
                        href={"/"}
                        className="flex items-center align-center"
                      >
                        <AiOutlineHome className="text-lg" />
                      </Link>
                    ),
                  },
                  ...breadcrumb.map((item) => ({
                    title: (
                      <Link
                        href={item?.href}
                        className="flex items-center align-center gap-1"
                      >
                        {item.title}
                      </Link>
                    ),
                  })),
                ]}
                className="flex items-center align-center gap-1 "
              />
              <h1 className="text-2xl font-semibold shrink-0">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default DefaultLayout;
