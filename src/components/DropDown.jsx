import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";

const DropDown = ({ options, onChange, value, label, placeholder, icon }) => {
  return (
    <div className="w-full">
      <label className="body-regular text-[#4F4F4F]">{label}</label>

      <Menu as="div" className="relative w-full ">
        <div>
          <Menu.Button className="w-full inline-flex h-[42px] justify-between rounded-md  px-4 py-2 text-sm font-medium body-regular primary-border-color">
            {placeholder ? placeholder : <p></p>}
            {icon ? (
              icon
            ) : (
              <BiChevronDown
                className=" h-5 w-5 text-right  text-secondary-500"
                aria-hidden="true"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="w-full z-10 absolute right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "primary-background  text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Custom dropdown icon */}
      {/* <div className="pointer-events-none absolute inset-y-0 text-[22px] right-0 top-5 flex items-center pr-2">
        <BiChevronDown />
      </div> */}
    </div>
  );
};

export default DropDown;
