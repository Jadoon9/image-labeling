import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Form, Formik } from "formik";

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
                  {/* Row 1 */}
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
                      {/* {categories.map((item, index) => ( */}
                      <div className=" flex flex-col gap-4 p-4">
                        <CategoryCard
                          cat={categories[0].cat}
                          type={categories[0].type}
                          elemntId={`dicomImage${categories[0].cat}`}
                          images={categories[0].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox name="option1" text="Option 1" />
                          <Checkbox name="option2" text="Option 2" />
                        </div>
                      </div>
                      <div className=" flex flex-col gap-4 p-4 ">
                        <CategoryCard
                          cat={categories[1].cat}
                          type={categories[1].type}
                          elemntId={`dicomImage${categories[1].cat}`}
                          images={categories[1].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox name="option3" text="Option 3" />
                          <Checkbox name="option4" text="Option 4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full space-x-4 my-5">
                      <div className="w-[80%]">
                        <Button btnText="Sync" nobg />
                      </div>
                    </div>
                  </>
                  {/* Row 2 */}
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
                      {/* {categories.map((item, index) => ( */}
                      <div className=" flex flex-col gap-4 p-4">
                        <CategoryCard
                          cat={categories[2].cat}
                          type={categories[2].type}
                          elemntId={`dicomImage${categories[2].cat}`}
                          images={categories[2].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox
                            id="option1"
                            name="option1"
                            text="Option 1"
                          />
                          <Checkbox
                            id="option2"
                            name="option2"
                            text="Option 2"
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col gap-4 p-4 ">
                        <CategoryCard
                          cat={categories[3].cat}
                          type={categories[3].type}
                          elemntId={`dicomImage${categories[3].cat}`}
                          images={categories[3].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox name="option3" text="Option 3" />
                          <Checkbox name="option4" text="Option 4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full space-x-4 my-5">
                      <div className="w-[80%]">
                        <Button btnText="Sync" nobg />
                      </div>
                    </div>
                  </>
                  {/* Row 3 */}
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
                      {/* {categories.map((item, index) => ( */}
                      <div className=" flex flex-col gap-4 p-4">
                        <CategoryCard
                          cat={categories[4].cat}
                          type={categories[4].type}
                          elemntId={`dicomImage${categories[4].cat}`}
                          images={categories[4].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox
                            id="option1"
                            name="option1"
                            text="Option 1"
                          />
                          <Checkbox
                            id="option2"
                            name="option2"
                            text="Option 2"
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col gap-4 p-4 ">
                        <CategoryCard
                          cat={categories[5].cat}
                          type={categories[5].type}
                          elemntId={`dicomImage${categories[5].cat}`}
                          images={categories[5].images}
                        />

                        <div className="flex flex-col gap-6 mt-2">
                          <Checkbox
                            id="option3"
                            name="option3"
                            text="Option 3"
                          />
                          <Checkbox
                            id="option4"
                            name="option4"
                            text="Option 4"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full space-x-4 my-5">
                      <div className="w-[80%]">
                        <Button btnText="Sync" nobg />
                      </div>
                    </div>
                  </>
                  <div className=" flex items-center justify-center w-full space-x-4 my-5 ">
                    <div className="w-[80%] mt-2 pb-2">
                      <Button btnText="Submit" />
                    </div>
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
