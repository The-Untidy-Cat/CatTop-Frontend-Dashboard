import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { NavbarMenu, SidebarMenu } from "./Menu";
import { Avatar, Breadcrumb, Button } from "antd";
import Head from "next/head";

const DefaultLayout = ({ children, title, breadcrumb = [] }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <Head>
        <title>{title ? `${title} | Dashboard` : "CatTop Dashboard"}</title>
      </Head>
      <main className="flex flex-col bg-gray-100/[.3] h-full w-full over-hidden m-0 p-0 gap-1">
        <header className="flex w-full h-fit border-b bg-white justify-between items-center align-center px-2 shrink-0 grow-0">
          <nav className="flex items-center align-center gap-2 h-12 ml-2 md:ml-5">
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
              <AiOutlineLaptop className="text-2xl text-primary" />
              CatTop
            </Link>
            <NavbarMenu />
          </nav>
          <div className="flex items-center align-center gap-2 h-12">
            <Avatar
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
              className="w-8 h-8"
            />
          </div>
        </header>
        <div className="relative flex w-full h-full overflow-hidden bg-transparent">
          <div className="hidden md:flex w-56 items-start align-center gap-2 h-full bg-white border-r overflow-y-auto shrink-0">
            <SidebarMenu />
          </div>
          {openSidebar && (
            <div className="md:hidden absolute z-10 flex w-56 items-start align-center gap-2 h-full bg-white border-r overflow-y-auto shrink-0">
              <SidebarMenu />
            </div>
          )}

          <div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto bg-transparent">
            <div className="absolute flex flex-col w-full h-fit min-h-full p-5 md:px-8 bg-transparent">
              <Breadcrumb
                separator=">"
                items={[
                  {
                    title: (
                      <Link href={"/"} className="flex items-center align-center">
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
                className="flex items-center align-center gap-1 mb-2"
              />
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default DefaultLayout;
