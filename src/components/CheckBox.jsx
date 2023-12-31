import { useField } from "formik";
import React, { useState } from "react";

const Checkbox = ({ id, text, name, valueHandler, handleHide }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    field.onChange(e); // Update the formik field value
    valueHandler && valueHandler(e.target.name, e.target.checked);
    console.log(
      "handleHide && e.target.checked && handleHide(false)",
      handleHide && e.target.checked && handleHide(false)
    );
    handleHide && e.target.checked && handleHide(false);
  };

  return (
    <div className=" w-full flex items-center gap-24">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="hidden"
        checked={field?.value}
        {...field}
        onChange={handleChange}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="w-6 h-6 primary-border-color rounded-md flex items-center justify-center mr-2 transition duration-300 ease-in-out">
          {field?.value && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="8" fill="#C8BCF6" />
            </svg>
          )}
        </div>
        <span className="text-[#4F4F4F] body-light">{text}</span>
      </label>
      {meta?.touched && meta?.error && (
        <p className="text-red-500 body-regular">{meta?.error || "\u00A0"}</p>
      )}
    </div>
  );
};

export default Checkbox;
