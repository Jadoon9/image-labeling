import React from "react";
import CategoryCard from "./CategoryCard";
import Checkbox from "./CheckBox";
import Button from "./Button";

const CategoryCardItem = ({ imageUrls }) => {
  return (
    <div className=" flex flex-wrap justify-between gap-5  px-5 mb-10 w-full">
      <div className="flex items-center mb-1 space-x-4 w-full">
        <CategoryCard />
      </div>
      <div className="flex items-start space-x-4 w-full">
        <Checkbox text="Option 1" />

        <Checkbox text="Option 2" />
      </div>
      <div className="flex items-start  space-x-4 w-full">
        <Checkbox text="Option 3" />

        <Checkbox text="Option 4" />
      </div>

      <div className="flex items-center justify-center w-full space-x-4 my-5">
        <div className="w-[80%]">
          <Button btnText="Sync" nobg />
        </div>
      </div>
    </div>
  );
};

export default CategoryCardItem;
