import React, { Fragment, useState } from "react";
import { sidebarItems } from "../constants";
import Avatar from "../assets/avatar.jpg";
import { Dialog, Disclosure, Switch, Transition } from "@headlessui/react";

import { CiSearch } from "react-icons/ci";
import { BsChevronDown } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden flex-between"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-14 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center text-black rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto px-2 pt-5 pb-12">
                  <nav className="mt-5 space-y-1 px-2 ">
                    <div className="flex flex-1 flex-col gap-6">
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
                        <div className="mt-10">
                          <h3 className="h3-bold">Projects</h3>
                          <p
                            className="body-regular cursor-pointer"
                            onClick={() => navigate("/")}
                          >
                            Create New Project +
                          </p>
                        </div>
                        {sidebarItems.map((item, idx) => {
                          return (
                            <>
                              <Disclosure key={idx}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex flex-between w-full justify-between rounded-[16px]  secondary-background px-4 py-2 text-left text-sm font-medium focus:outline-none h-[56px]">
                                      <span className="body-medium">
                                        {item.text}
                                      </span>
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
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" />
          </div>
        </Dialog>
      </Transition.Root>
      {/* Desktop */}
      <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20  lg:w-[266px] max-md:hidden">
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
            <div className="mt-10">
              <h3 className="h3-bold">Projects</h3>
              <p
                className="body-regular cursor-pointer"
                onClick={() => navigate("/")}
              >
                Create New Project +
              </p>
            </div>
            {sidebarItems.map((item, idx) => {
              return (
                <>
                  <Disclosure key={idx}>
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

                        <Disclosure.Panel className="px-4 pt-4 pb-2 body-regular">
                          <p
                            className="body-light mb-1 text-[#4444F4] cursor-pointer"
                            onClick={() => setIsOpen(true)}
                          >
                            Create a session +
                          </p>
                          Session 1
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
    </>
  );
};

export default Sidebar;
