import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

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
  const { rows, columns } = useSelector((state) => state.layout);
  console.log(columns, "chhecc");
  return (
    <>
      <Formik
        initialValues={{
          option1: false,
          option2: false,
          option3: false,
          option4: false,
        }}
        // validationSchema={taxonomySchema}
        onSubmit={(values) => {
          console.log(values, "valuess");
        }}
      >
        {() => (
          <Form>
            <div className="">
              <div className="flex-between py-10 ">
                <BackButton />
                <h3 className="h3-bold">Person 1</h3>
                <div className="w-48">
                  <Button btnText="Next" showIcon />
                </div>
              </div>

              <div className="gap-2 flex ">
                <div className="flex-1 px-4 ">
                  <div className=" grid grid-cols-1 p-4 primary-border-color">
                    <h3 className="h3-bold mb-2">Reference</h3>
                    <div className="flex ">
                      <CategoryCard
                        elemntId={`dicomImage-0`}
                        images={imageUrls}
                        hideTitle
                      />
                    </div>
                  </div>
                  {/* <div className={`grid col-span-2 w-full gap-2 relative`}> */}
                  <div
                    className={`grid ${
                      columns ? `grid-cols-${columns}` : "grid-cols-2"
                    } w-full relative `}
                  >
                    {categories.map((item, index) => {
                      return (
                        <div key={item.cat} className="flex flex-col gap-4 p-1">
                          <CategoryCard
                            cat={item.cat}
                            type={item.type}
                            elementId={`dicomImage${item.cat}`}
                            images={item.images}
                          />
                          <div className="flex flex-col gap-6 mt-2">
                            <Checkbox name="option1" text="Option 1" />
                            <Checkbox name="option2" text="Option 2" />
                          </div>
                          {/* Display button under every 2 items */}
                          {(index + 1) % 2 === 0 && (
                            <div className="w-full">
                              <div className="col-span-2 flex items-center justify-center w-full mt-8 mb-8 ">
                                <div className="w-[80%] absolute left-20 ">
                                  <Button btnText="Sync" nobg />
                                </div>
                              </div>
                            </div>
                          )}
                          {/* Empty div for spacing */}
                          <div className="w-full">
                            <div className="col-span-2 flex items-center justify-center w-full mt-8 mb-8 ">
                              <div className="w-[80%] ">
                                <Button btnText="Submit" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Centered button spanning full width */}
                  </div>
                </div>

                <div className="w-[200px] flex flex-col  max-md:hidden primary-border-color p-2 h-auto">
                  <div className="flex flex-col mb-4  justify-center h-[400px] bg-red">
                    <RangeSelector />
                    <div className="flex flex-col gap-5">
                      <Checkbox id="option1" name="option1" text="Label 1" />
                      <Checkbox id="option2" name="option2" text="Label 2" />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4  justify-center h-[600px] bg-red">
                    <RangeSelector />
                    <div className="flex flex-col gap-5">
                      <Checkbox id="option3" name="option1" text="Label 1" />
                      <Checkbox id="option4" name="option 2" text="Label 2" />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4  justify-center h-[600px] bg-red">
                    <RangeSelector />
                    <div className="flex flex-col gap-5">
                      <Checkbox id="option1" name="option 2" text="Label 1" />
                      <Checkbox id="option2" name="option 2" text="Label 2" />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4  justify-center h-[600px] bg-red">
                    <RangeSelector />
                    <div className="flex flex-col gap-5">
                      <Checkbox id="option1" name="option 2" text="Label 1" />
                      <Checkbox id="option2" name="option 2" text="Label 2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonPage;
