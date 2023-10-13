import React from "react";
import Input from "../Input";
import NumberInput from "../NumberInput";
import DropDown from "../DropDown";
import { drpItems } from "../../constants";
import BackButton from "../BackButton";
import Button from "../Button";
import { HiOutlineFolder } from "react-icons/hi2";

const Taxonomy = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="p-5 flex-between flex-wrap  gap-5 w-full">
          <div className="flex-between flex-wrap gap-1 w-full ">
            <div className="w-full md:w-[48%]">
              <Input label="Project Name" />
            </div>
            <div className="w-full  md:w-[48%]">
              <DropDown options={drpItems} label="Options" />
            </div>
          </div>

          <div className="flex-between flex-wrap w-full">
            <div className="w-full   md:w-[48%]">
              <Input label="Question" />
            </div>
            <div className="w-full  md:w-[48%]">
              <DropDown
                options={drpItems}
                label="Reference Class"
                icon={
                  <HiOutlineFolder
                    className=" h-5 w-5 text-right text-secondary-500 "
                    aria-hidden="true"
                  />
                }
              />
            </div>
          </div>

          <div className="flex-between  flex-wrap  justify-between w-full">
            <div className="w-full md:w-[48%] ">
              <Input label="Label" />
            </div>
            <div className="flex-between w-full  md:w-[48%] gap-2">
              <div className="w-full md:w-[48%] ">
                <NumberInput label="Evaluation Page Layout" />
              </div>
              <div className=" md:w-[48%] w-full ">
                <NumberInput />
              </div>
            </div>
          </div>

          <div className="flex-between flex-wrap w-full ">
            <div className="flex-between w-full gap-2">
              <div className="w-full  md:w-[48%]">
                <NumberInput label="Labels" />
              </div>
              <div className="w-full  md:w-[48%]">
                <NumberInput />
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 w-1/2">
          <DropDown label="Select Option" options={drpItems} />
        </div>
      </div>

      <div className="flex-between relative bottom-0 mt-auto p-5">
        <BackButton />
        <div className="w-32">
          <Button btnText="Next" icon />
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
