import { Listbox, Menu, Transition } from "@headlessui/react";
import { Field, useField } from "formik";
import React, { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const DropDown = ({
  options,
  onChange,
  value,
  label,
  placeholder,
  icon,
  name,
}) => {
  const [field, meta] = useField(name);
  console.log(field, "iu988");
  return (
    <div className="w-full">
      <label className="body-regular text-[#4F4F4F]">{label}</label>

      <Listbox {...field} className="z-10">
        <div className="relative mt-1">
          <Listbox.Button className="w-full cursor-default appearance-none primary-border-color rounded-[8px] h-[42px] py-2 pl-3 pr-10 text-left focus:outline-none">
            <span className="block truncate body-light ">
              {field.value || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 z-10 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "body-regular" : "body-regular"
                        }`}
                      >
                        {item.value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error}</p>
      )}
    </div>
  );
};

export default DropDown;
