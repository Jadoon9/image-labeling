import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const VerticalLayout = ({ children, setIsOpen }) => {
  const [open, setOpen] = useState(false);
  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <main className="relative">
      <button
        className="flex items-start px-8 py-3 md:hidden "
        onClick={handleSidebar}
      >
        <GiHamburgerMenu className="w-5 h-5" />
      </button>
      <div className="flex">
        <Sidebar
          sidebarOpen={open}
          setSidebarOpen={handleSidebar}
          setIsOpen={setIsOpen}
        />
        <div className="flex-1 px-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default VerticalLayout;
