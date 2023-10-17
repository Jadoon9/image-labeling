import { useField } from "formik";
import React from "react";

const Textarea = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <textarea
        className="primary-border-color w-full !focus:ring-1 !focus:border-[primary-border-color] rounded-[8px] p-2 body-regular mt-2"
        id=""
        cols="40"
        rows="10"
        placeholder="Write note here"
        name={name}
        {...field}
      ></textarea>

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error}</p>
      )}
    </>
  );
};

export default Textarea;
