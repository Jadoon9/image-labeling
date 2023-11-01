import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

import CategoryCardItem from "../components/CategoryCardItem";
import RangeSelector from "../components/RangeSelector";
import Checkbox from "../components/CheckBox";
import CategoryCard from "../components/CategoryCard";
import CreateSubject from "../components/models/CreateSubject";
import cornerstoneTools from "cornerstone-tools";
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
  const { taxonomy } = useSelector((state) => state.layout);
  const synchronizer = new cornerstoneTools.Synchronizer(
    "CornerstoneNewImage",
    cornerstoneTools.updateImageSynchronizer
  );

  const [isSynced, setIsSynced] = useState(false);

  const handleSync = () => {
    setIsSynced(!isSynced);
  };

  useEffect(() => {
    if (taxonomy.columns) {
      document.querySelector("#dynamicGrid").style[
        "grid-template-columns"
      ] = `repeat(${taxonomy.columns}, minmax(0, 1fr))`;
    } else {
      document.querySelector("#dynamicGrid").style[
        "grid-template-columns"
      ] = `repeat(2, minmax(0, 1fr))`;
    }
  }, []);

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

                  <div id="dynamicGrid" className={`grid w-full relative `}>
                    {categories.map((item, index) => {
                      // Calculate the IDs for the next two elements
                      const nextElement1Id = categories[index + 1]
                        ? `dicomImage${categories[index + 1].cat}`
                        : null;
                      const nextElement2Id = categories[index + 2]
                        ? `dicomImage${categories[index + 2].cat}`
                        : null;

                      return (
                        <div key={item.cat} className="flex flex-col gap-4 p-1">
                          <CategoryCard
                            cat={item.cat}
                            type={item.type}
                            elementId={`dicomImage${item.cat}`}
                            images={item.images}
                            elementId1={nextElement1Id}
                            elementId2={nextElement2Id}
                            isSynced={isSynced}
                            synchronizer={synchronizer}
                            // setZoomActive={setZoomActive}
                          />
                          <div className="flex flex-col gap-6 mt-2">
                            <Checkbox name="option1" text="Option 1" />
                            <Checkbox name="option2" text="Option 2" />
                          </div>

                          {(index + 1) % 2 === 0 && (
                            <div className="col-span-2 flex items-center justify-center w-full mt-8 mb-8 ">
                              <div className="w-[100%] absolute left-0 p-32 ">
                                <Button
                                  btnText="Sync"
                                  nobg
                                  onClick={handleSync}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Centered button spanning full width */}
                  </div>
                  <div className="w-full flex m-auto px-32 py-5">
                    <div className="w-[100%]">
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
