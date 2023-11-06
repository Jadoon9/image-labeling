import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

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
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../store/services/projectService";
import { addProject } from "../store/slice/projectSlice";

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
  const { id } = useParams();
  const { isLoading, isSuccess, isFetching, isError, refetch, error, data } =
    useGetProjectQuery(id);

  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.project);
  const { taxonomy } = useSelector((state) => state.layout);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isSynced, setIsSynced] = useState(false);
  const [currentSlice, setCurrentSlice] = useState(0);

  useEffect(() => {
    if (data) {
      dispatch(addProject(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
    dispatch(addProject(data));
    return () => {
      console.log("jkjhkjh");
    };
  }, [id]);

  useEffect(() => {
    if (projectData?.session[0]?.case[currentCaseIndex]?.cols_number) {
      document.querySelector("#dynamicGrid").style[
        "grid-template-columns"
      ] = `repeat(${projectData?.session[0]?.case[currentCaseIndex]?.cols_number}, minmax(0, 1fr))`;
    } else {
      document.querySelector("#dynamicGrid").style[
        "grid-template-columns"
      ] = `repeat(2, minmax(0, 1fr))`;
    }
  }, [id]);
  const handleSync = () => {
    setIsSynced(!isSynced);
  };

  const handleNextCase = () => {
    // Increment the case index to switch to the next case
    setCurrentCaseIndex((prevIndex) => prevIndex + 1);
  };
  const handleBackCase = () => {
    // Increment the case index to switch to the next case
    setCurrentCaseIndex((prevIndex) => prevIndex - 1);
  };
  // Check if there are more cases to display
  const hasMoreCases =
    currentCaseIndex < (data?.session[0]?.case.length || 0) - 1;

  function distributeArrayElements(labels, numRows) {
    const duplicatedArray = Array.from({ length: numRows }, () => [...labels]);
    return duplicatedArray;
  }

  const distributedLabels = distributeArrayElements(
    projectData?.session[0]?.case[currentCaseIndex]?.labels,
    projectData?.session[0]?.case[currentCaseIndex]?.rows_number
  );

  console.log(distributedLabels, "jkkjkj");
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
                <BackButton
                  onClick={handleBackCase}
                  disabled={currentCaseIndex === 0}
                />
                <h3 className="h3-bold">
                  {projectData?.session[0]?.case[currentCaseIndex]?.case_name}
                </h3>
                <div className="w-48">
                  <Button
                    type="button"
                    btnText="Next"
                    showIconhasMoreCases
                    disabled={!hasMoreCases}
                    onClick={handleNextCase}
                  />
                </div>
              </div>

              <div className="gap-2 flex ">
                <div className="flex-1 px-4 ">
                  <div className=" grid grid-cols-1 p-4 primary-border-color">
                    <h3 className="h3-bold mb-2">Reference</h3>
                    <div className="flex ">
                      <CategoryCard
                        id={id}
                        elemntId={`dicomImage-0`}
                        images={
                          projectData?.session[0]?.case[currentCaseIndex]
                            ?.reference_folder?.image_list
                        }
                        hideTitle
                      />
                    </div>
                  </div>

                  <div id="dynamicGrid" className={`grid w-full relative `}>
                    {projectData?.session[0]?.case[currentCaseIndex]
                      ?.category_type.length &&
                      projectData?.session[0]?.case[
                        currentCaseIndex
                      ]?.category_type?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-4 p-1">
                            <CategoryCard
                              id={id}
                              cat={item.category}
                              idx={index}
                              type={item.type}
                              elementId={`dicomImage${item.cat}`}
                              images={item.image_list}
                              isSynced={isSynced}
                              // setZoomActive={setZoomActive}
                            />
                            <div className="flex flex-col gap-6 mt-2">
                              {projectData?.session[0]?.case[
                                currentCaseIndex
                              ]?.options?.map((item) => (
                                <Checkbox name={item.value} text={item.value} />
                              ))}
                            </div>

                            {(index + 1) % 2 === 0 && (
                              <div className="col-span-2 flex items-center justify-center w-full mt-8 mb-8 ">
                                <div className="w-[100%] absolute left-0 px-32 ">
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
                  <div className="h-[400px]"></div>
                  <div className="flex flex-col gap-6">
                    {distributedLabels.length &&
                      distributedLabels?.map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex flex-col gap-4 p-1 h-[600px]"
                        >
                          {row.map((item, index) => {
                            if (item?.value?.includes("-")) {
                              const [before, after] = item.value.split("-");
                              return (
                                <RangeSelector
                                  key={index}
                                  before={before}
                                  after={after}
                                />
                              );
                            } else {
                              return (
                                <Checkbox
                                  key={index}
                                  id={item.value}
                                  name={item.value}
                                  text={item.value}
                                />
                              );
                            }
                          })}
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-col mb-4 mt-10 h-[620px] bg-red">
                    {/* <RangeSelector /> */}
                    <div className="flex flex-col gap-5"></div>
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
