import React from "react";
import CheckBox from "../CheckBox";
import BackButton from "../BackButton";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 flex flex-col justify-between h-full">
      <label htmlFor="" className="body-light text-[#4F4F4F]">
        Instruction notes
      </label>
      <textarea
        className="primary-border-color w-full  rounded-[8px] p-2 body-regular mt-2"
        name=""
        id=""
        cols="40"
        rows="10"
        placeholder="Write note here"
      ></textarea>

      <div className="mt-10 flex flex-col gap-4 ">
        <CheckBox text="Randomize Cases" />
        <CheckBox text="Randomize Categories" />
      </div>

      <div className="flex-between relative bottom-0 mt-40">
        <BackButton />
        <div className="w-32">
          <Button btnText="Finish" icon onClick={() => navigate("/person")} />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
