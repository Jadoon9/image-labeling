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
        <div className="p-5 flex flex-wrap justify-between gap-5 w-full">
          <div className="flex items-center mb-1 space-x-4 w-full ">
            <div className="w-[50%]">
              <Input label="Project Name" />
            </div>
            <div className="flex flex-col w-[50%] gap-3">
              <DropDown options={drpItems} label="Options" />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-1 w-full">
            <div className="w-[50%]">
              <Input label="Question" />
            </div>
            <div className="w-[50%]">
              <DropDown
                options={drpItems}
                label="Reference Class"
                icon={
                  <HiOutlineFolder
                    className=" h-5 w-5  text-right text-secondary-500 "
                    aria-hidden="true"
                  />
                }
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <div className="w-[50%]">
              <Input label="Label" />
            </div>
            <div className="flex-between w-[50%] gap-2">
              <div className="w-[50%]">
                <NumberInput label="Evaluation Page Layout" />
              </div>
              <div className="w-[50%]">
                <NumberInput />
              </div>
            </div>
          </div>

          <div className="flex items-center w-full ">
            <div className="flex-between w-[50%] gap-2">
              <div className="w-[50%]">
                <NumberInput label="Labels" />
              </div>
              <div className="w-[50%]">
                <NumberInput label="Labels" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 w-[50%]">
          <DropDown label="Select Option" options={drpItems} />
        </div>

        {/* <div className=" p-5 w-[400px] ">
          <div className="flex justify-evenly w-full gap-5 ">
            <p className="body-light">Cat 1</p>
            <p className="body-light">Cat 2</p>
          </div>
          <div className="flex-between w-full gap-5 ">
            <p className="body-light  w-52">Option 1</p>
            <DropDown options={drpItems} />
            <DropDown options={drpItems} />
          </div>
          <div className="flex-between w-full gap-5 ">
            <p className="body-light w-52">Option 2</p>
            <DropDown options={drpItems} />
            <DropDown options={drpItems} />
          </div>

        
        </div> */}
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
