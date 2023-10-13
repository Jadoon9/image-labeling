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
            class="outline-none py-2 body-regular focus:outline-none secondary-background"
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
            <p className="body-regular flex-1">Light Mode</p>

            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "primary-background" : ""
                  } relative inline-flex h-6 w-11 primary-border-color items-center rounded-full transition-colors focus:outline-none `}
                >
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-black transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
