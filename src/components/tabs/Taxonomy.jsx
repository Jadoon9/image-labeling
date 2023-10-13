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
        <div className="p-5 flex-between flex-wrap gap-5 w-full">
          <div className="flex-between flex-wrap gap-2 w-full ">
            <div className="w-full md:w-[49%]">
              <Input label="Project Name" />
            </div>
            <div className=" w-full md:w-[49%]">
              <DropDown options={drpItems} label="Options" />
              {/* <p className="body-regular mt-2">Add another option</p> */}
            </div>
          </div>

          <div className="flex-between flex-wrap w-full">
            <div className="w-full   md:w-[49%]">
              <Input label="Question" />
            </div>
            <div className="w-full  md:w-[49%]">
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
            <div className="w-full md:w-[49%] ">
              <Input label="Label" />
            </div>
            <div className="flex-between w-full  md:w-[49%] gap-2">
              <div className="w-full md:w-[49%] ">
                <NumberInput label="Evaluation Page Layout" />
              </div>
              <div className=" md:w-[49%] w-full ">
                <NumberInput />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full ">
            <div className="flex gap-1 w-1/2 ">
              <div className="w-full md:w-[49%]">
                <NumberInput label="Labels" />
              </div>
              <div className="w-full md:w-[49%]">
                <NumberInput />
              </div>
            </div>
          </div>
        </div>
        <div className="pl-5 md:w-[49%]">
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
