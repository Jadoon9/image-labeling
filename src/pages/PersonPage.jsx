import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

import CategoryCardItem from "../components/CategoryCardItem";
import RangeSelector from "../components/RangeSelector";
import Checkbox from "../components/CheckBox";
import CategoryCard from "../components/CategoryCard";
import CreateSubject from "../components/models/CreateSubject";
import image1 from "../assets/dicom data/case1/AI_ABC/1.dcm";
import image2 from "../assets/dicom data/case1/AI_ABC/2.dcm";
import image3 from "../assets/dicom data/case1/AI_ABC/3.dcm";
import image4 from "../assets/dicom data/case1/AI_ABC/4.dcm";
import image5 from "../assets/dicom data/case1/AI_ABC/5.dcm";
import image6 from "../assets/dicom data/case1/AI_ABC/6.dcm";

const imageUrls = [image1, image2, image3, image4, image5, image6];

const categories = [
  { cat: 1, type: 1, images: imageUrls },
  { cat: 2, type: 2, images: imageUrls },
  { cat: 3, type: 3, images: imageUrls },
  { cat: 4, type: 4, images: imageUrls },
  { cat: 5, type: 5, images: imageUrls },
  { cat: 6, type: 6, images: imageUrls },
];

const PersonPage = () => {
  return (
    <div className="">
      <div className="flex-between py-10 ">
        <BackButton />
        <h3 className="h3-bold">Person 1</h3>
        <div className="w-48">
          <Button btnText="Next" showIcon />
        </div>
      </div>

      <div className="gap-2 flex ">
        <div className=" flex-1 px-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 w-full">
            {categories.map((item, index) => (
              <div key={index} className=" flex flex-col gap-4 p-4">
                <CategoryCard
                  cat={item.cat}
                  type={item.type}
                  elemntId={`dicomImage${item.cat}`}
                  images={item.images}
                />

                <>
                  <div className="flex flex-col gap-6 mt-2">
                    <Checkbox text="Option 1" />
                    <Checkbox text="Option 2" />
                  </div>
                </>

                {/* Render button after every 2 items */}
                {(index + 1) % 2 === 0 && (
                  <div className="grid grid-col-12  mt-4">
                    <Button btnText="Sync" nobg />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className="flex items-center justify-center w-full space-x-4 my-5">
            <div className="w-[80%]">
              <Button btnText="Sync" nobg />
            </div>
          </div> */}

          <div className="w-100 px-5 flex-center">
            <div className="w-[80%] mt-10 pb-2">
              <Button btnText="Submit" />
            </div>
          </div>
        </div>

        <div className="w-[200px] flex flex-col  max-md:hidden justify-around primary-border-color p-2 h-auto">
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
