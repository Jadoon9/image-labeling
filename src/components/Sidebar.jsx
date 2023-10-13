import React, { useState } from "react";
import { sidebarItems } from "../constants";
import Avatar from "../assets/avatar.jpg";
import { Disclosure, Switch } from "@headlessui/react";

import { CiSearch } from "react-icons/ci";
import { BsChevronDown } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20  lg:w-[266px]">
      <div className="flex flex-1 flex-col  gap-6">
        <div className="flex gap-2">
          <img src={Avatar} alt="avatar" className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="paragraph-regular">Name</p>
            <p className="body-light">Username</p>
          </div>
        </div>
        <div class="flex gap-1 rounded-[16px] items-center border secondary-background p-2">
          <CiSearch />
          <input
            class="outline-none body-regular focus:outline-none secondary-background"
            type="text"
            placeholder="Search..."
          />
        </div>
        {/* =============================== */}
        <div className=" flex flex-col flex-1 gap-3">
          <h3 className="h3-bold mt-10">Projects</h3>
          {sidebarItems.map((item) => {
            return (
              <>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex flex-between w-full justify-between rounded-[16px]  secondary-background px-4 py-2 text-left text-sm font-medium focus:outline-none h-[56px]">
                        <span className="body-medium">{item.text}</span>
                        <BsChevronDown
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-4 w-4 `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        Section1
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </>
            );
          })}
        </div>

        {/* =============================== */}

        <div className="mt-5 flex-column gap-5 align-middle justify-center">
          <div className="flex align-middle gap-5 cursor-pointer">
            <TbLogout />
            <p className="body-regular ">Logout</p>
          </div>
          <div className="flex align-middle gap-5 mt-10 cursor-pointer">
            <BsSun />
            <p className="body-regular">Light Mode</p>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? "primary-background" : "bg-gray-300"}
          relative inline-flex h-[20px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
