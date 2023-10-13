import React from "react";
import { BsChevronRight } from "react-icons/bs";

const Button = ({ btnText, onClick, icon, nobg }) => {
  return (
    <div
      className={`w-full cursor-pointer tracking-wider text-black text-center ${
        nobg ? "" : "primary-background"
      } py-[10px] px-auto rounded-[8px] primary-border-color`}
      onClick={onClick}
    >
      <div className="flex-center base-medium gap-2">
        {btnText}

        {icon && <BsChevronRight />}
      </div>
    </div>
  );
};

export default Button;
