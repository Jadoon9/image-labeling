import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="py-[15px] px-5 bg-[#F5F5F5] rounded-[8px]"
      >
        <IoIosArrowBack />
      </button>
    </div>
  );
};

export default BackButton;
