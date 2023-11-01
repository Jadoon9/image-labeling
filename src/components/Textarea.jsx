import { useField } from "formik";
import React from "react";

const Textarea = ({ name, rows, cols , valueHandler}) => {
  const [field, meta, helpers] = useField(name);
  const handleChange = (e) => {
    field.onChange(e); // Update the formik field value
    valueHandler && valueHandler(e.target.name, e.target.value);
  };
  return (
    <>
      <textarea
        className="primary-border-color w-full !focus:ring-1  !focus:border-[primary-border-color] rounded-[8px] p-2 body-regular mt-2"
        id=""
        cols={cols}
        rows={rows}
        placeholder="Write note here"
        name={name}
        {...field}
        onChange={handleChange}
      ></textarea>

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error}</p>
      )}
    </>
  );
};

export default Textarea;
