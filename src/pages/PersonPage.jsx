import React from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

import CategoryCardItem from "../components/CategoryCardItem";
import RangeSelector from "../components/RangeSelector";
import Checkbox from "../components/CheckBox";
import CategoryCard from "../components/CategoryCard";

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
        <div px-5>
          <div className="mb-6 primary-border-color p-5">
            <h3 className="h3-bold mb-4">Reference</h3>
            <CategoryCard image2 hideTitle />
          </div>
          <CategoryCardItem />
          <CategoryCardItem />
          <CategoryCardItem />
          <CategoryCardItem />
        </div>

        <div className="min-w-[250px] flex flex-col justify-around primary-border-color p-2 h-auto">
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
