import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const VerticalLayout = ({ children }) => {
  return (
    <main className="relative">
      <div className="flex">
        <Sidebar />
        <div className="flex-1  px-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default VerticalLayout;
