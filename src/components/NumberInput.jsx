import React from "react";
import { useDispatch } from "react-redux";
import { Field, useField, useFormikContext } from "formik";
import { laoyoutRows, layoutCols } from "../store/slice/layoutSlice";

const NumberInput = ({ label, name, valueHandler, isRequired }) => {
  const [field, meta, helpers] = useField(name);

  const incrementNumber = (e) => {
    e.preventDefault();
    helpers.setValue(field?.value + 1);
    valueHandler && valueHandler(field?.name, field?.value + 1);
  };

  const decrementNumber = (e) => {
    e.preventDefault();
    helpers.setValue(field?.value - 1);
    valueHandler && valueHandler(field?.name, field?.value - 1);
  };

  const handleChange = (e) => {
    console.log("eeee", e.target.value, e.target.name);
    field.onChange(e); // Update the formik field value
    valueHandler && valueHandler(e.target.name, e.target.value);
  };

  return (
    <div>
      {label ? (
        <label htmlFor="" className="body-regular w-100 text-[#4F4F4F]">
          {label} {isRequired && <span className="text-red-400">*</span>}
        </label>
      ) : (
        <div className="h-6"></div>
      )}
      <div className="relative flex items-center mt-2">
        <input
          style={{
            WebkitAppearance: "none", // For Chrome and Safari
            MozAppearance: "textfield", // For Firefox
          }}
          type="number"
          className="primary-border-color body-light w-full rounded-[8px] p-2 focus:outline-none h-[42px] focus:ring-1 focus:border-[primary-border-color] appearance-none  -moz-appearance: textfield; "
          {...field}
          onChange={handleChange}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <button
            className="px-1 py-1 rounded-[6px]  custom-shadow-2 focus:outline-none"
            onClick={(e) => incrementNumber(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </button>
          <button
            className="px-1 py-1 rounded-[6px] ml-1 custom-shadow-2  focus:outline-none"
            onClick={(e) => decrementNumber(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
