import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

import CategoryCardItem from "../components/CategoryCardItem";
import RangeSelector from "../components/RangeSelector";
import Checkbox from "../components/CheckBox";
import CategoryCard from "../components/CategoryCard";
import CreateSubject from "../components/models/CreateSubject";

const PersonPage = () => {
  return (
    <div>
      <div className="flex-between py-10 ">
        <BackButton />
        <h3 className="h3-bold">Person 1</h3>
        <div className="w-48">
          <Button btnText="Next" showIcon />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="px-5">
          <div className="mb-6 primary-border-color p-5">
            <h3 className="h3-bold mb-4">Reference</h3>
            <CategoryCard image2 hideTitle />
          </div>
          <CategoryCardItem />
          <CategoryCardItem />
          <CategoryCardItem />
          <CategoryCardItem />
          <div className="w-100 px-5 flex-center">
            <div className="w-[80%] -mt-10 pb-2">
              <Button btnText="Submit" />
            </div>
          </div>
        </div>

        <div className="w-[200px]  md:w-[250px] flex flex-col  gap-72  max-md:hidden primary-border-color p-2 h-auto">
          <div className="mt-40  h-[180px]">
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Label 1" />
              <Checkbox text="Label 2" />
            </div>
          </div>
          <div className=" h-[180px]">
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Label 1" />
              <Checkbox text="Label 2" />
            </div>
          </div>
          <div className=" h-[180px]">
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Label 1" />
              <Checkbox text="Label 2" />
            </div>
          </div>
          <div className=" h-[180px]">
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Label 1" />
              <Checkbox text="Label 2" />
            </div>
          </div>
          <div className=" h-[180px]">
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Label 1" />
              <Checkbox text="Label 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
