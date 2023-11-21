import { disable } from "cornerstone-core";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

const Button = ({ btnText, onClick, icon, nobg, type, disabled }) => {
  console.log(disabled, "disabled");
  return (
    <button
      className={`w-full cursor-pointer tracking-wider text-black text-center ${
        nobg ? "" : "primary-background"
      } py-[8px] px-auto rounded-[8px] primary-border-color ${
        disabled || undefined
          ? "bg-red-400 border-primary-lighter cursor-not-allowed"
          : "hover:bg-primary hover:border-primary"
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled || undefined}
    >
      <div className="flex-center base-medium gap-2">
        {btnText}
        {icon && <BsChevronRight />}
      </div>
    </button>
  );
};

export default Button;
