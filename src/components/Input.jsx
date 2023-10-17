import { useField } from "formik";
import React from "react";

const Input = ({ type, placeholder, label, name }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <div className="w-full">
      <label htmlFor="" className="body-regular text-secondary-500">
        {label}
      </label>
      <input
        className="primary-border-color  focus:outline-none focus:ring-1 focus:border-[primary-border-color]  text-secondary-500 body-regular w-full h-[42px] mt-2 rounded-[8px] p-2  mb-2"
        type={type}
        placeholder={placeholder}
        name={name}
        {...field}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error || "\u00A0"}</p>
      )}
    </div>
  );
};

export default Input;
