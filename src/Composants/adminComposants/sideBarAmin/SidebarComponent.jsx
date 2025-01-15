import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import Image from "../../../assets/S.png"

export function SidebarComponent() {
  const customTheme = {
    root: {
      base: "h-full w-64",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-[#1d284d] py-4 px-3"
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-white hover:bg-[#293b6f]",
      active: "bg-violet-800",
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-white transition duration-75",
        active: "text-white"
      }
    },
    logo: {
      base: "mb-5 flex items-center pl-2.5",
      img: "mr-3 h-6 sm:h-7 rounded-lg",
    }
  };

  return (
    <Sidebar theme={customTheme} aria-label="Default sidebar example">
       <Sidebar.Logo
        href="#"
        img={Image}
        imgAlt="Logo"
      >
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Online Service
        </span>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
