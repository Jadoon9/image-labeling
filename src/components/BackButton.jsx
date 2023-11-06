import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = ({ onClick, disabled }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={onClick}
        className={`py-3 px-5 rounded-lg ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={disabled}
      >
        <IoIosArrowBack className="text-gray-600" />
      </button>
    </div>
  );
};

export default BackButton;
