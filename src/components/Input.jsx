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
        className="primary-border-color focus:primary-border-color text-secondary-500 body-regular w-full h-[42px] mt-2 rounded-[8px] p-2 focus:border-[#9f7aea]"
        type={type}
        placeholder={placeholder}
        name={name}
        {...field}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 body-normal">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
