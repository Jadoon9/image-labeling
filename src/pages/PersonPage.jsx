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

import { useParams } from "react-router-dom";
import {
  useAddSessionMutation,
  useGetProjectQuery,
} from "../store/services/projectService";
import {
  addProject,
  changeCheckBox,
  changeLabelCheckBox,
  replaceLabels,
  resetLabels,
  resetOptions,
} from "../store/slice/projectSlice";
import { distributeArrayElements } from "../constants";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import * as cornerstone3D from "@cornerstonejs/core";
import * as cornerstoneTools3D from "@cornerstonejs/tools";

const PersonPage = () => {
  //* SyNC functionality =======================
  const [isSynced, setIsSynced] = useState([]);

  const handleSync = (index) => {
    const viewPort1 = cornerstone3D
      .getRenderingEngine(`myRenderingEngine${index - 1}`)
      .getViewport(`CT_AXIAL_STACK${index - 1}`);
    const viewPort2 = cornerstone3D
      .getRenderingEngine(`myRenderingEngine${index}`)
      .getViewport(`CT_AXIAL_STACK${index}`);
    if (
      cornerstoneTools3D.SynchronizerManager.getSynchronizer(
        "zoomPanSynchronizer" + index
      )
    ) {
      cornerstoneTools3D.SynchronizerManager.destroySynchronizer(
        "zoomPanSynchronizer" + index
      );
    }

    if (
      cornerstoneTools3D.SynchronizerManager.getSynchronizer(
        "staclScrollSynchronizer" + index
      )
    ) {
      cornerstoneTools3D.SynchronizerManager.destroySynchronizer(
        "staclScrollSynchronizer" + index
      );
    }

    const panZoomSync =
      cornerstoneTools3D.SynchronizerManager.createSynchronizer(
        "zoomPanSynchronizer" + index,
        cornerstone3D.EVENTS.CAMERA_MODIFIED,
        (
          synchronizerInstance,
          sourceViewport,
          targetViewport,
          cameraModifiedEvent
        ) => {
          const IsourceViewport = cornerstone3D
            .getRenderingEngine(sourceViewport.renderingEngineId)
            .getViewport(sourceViewport.viewportId);
          const ItargetViewport = cornerstone3D
            .getRenderingEngine(targetViewport.renderingEngineId)
            .getViewport(targetViewport.viewportId);
          ItargetViewport.setImageIdIndex(
            IsourceViewport.getCurrentImageIdIndex()
          );

          const sCamera = IsourceViewport.getCamera();
          const tCamera = ItargetViewport.getCamera();
          ItargetViewport.setCamera({
            ...tCamera,
            parallelScale: sCamera.parallelScale,
            scale: sCamera.scale,
            focalPoint: sCamera.focalPoint,
          });
          IsourceViewport.render();
          ItargetViewport.render();
        }
      );

    const stackScrollSync =
      cornerstoneTools3D.SynchronizerManager.createSynchronizer(
        "staclScrollSynchronizer" + index,
        cornerstone3D.EVENTS.STACK_NEW_IMAGE,
        (
          synchronizerInstance,
          sourceViewport,
          targetViewport,
          cameraModifiedEvent
        ) => {
          const IsourceViewport = cornerstone3D
            .getRenderingEngine(sourceViewport.renderingEngineId)
            .getViewport(sourceViewport.viewportId);
          const ItargetViewport = cornerstone3D
            .getRenderingEngine(targetViewport.renderingEngineId)
            .getViewport(targetViewport.viewportId);
          ItargetViewport.setImageIdIndex(
            IsourceViewport.getCurrentImageIdIndex()
          );
          IsourceViewport.render();
          ItargetViewport.render();
        }
      );

    [viewPort1, viewPort2].map((element) => {
      const { renderingEngineId, id } = element;
      panZoomSync.add({ renderingEngineId, viewportId: id });
      stackScrollSync.add({ renderingEngineId, viewportId: id });
    });

    setIsSynced((prev) => [...prev, index]);
  };

  const handleRemoveSync = (index) => {
    if (
      cornerstoneTools3D.SynchronizerManager.getSynchronizer(
        "zoomPanSynchronizer" + index
      )
    ) {
      cornerstoneTools3D.SynchronizerManager.destroySynchronizer(
        "zoomPanSynchronizer" + index
      );
      setIsSynced((prev) => {
        return prev.filter((v) => v !== index);
      });
    }
  };

  //* end SyNC functionality =======================
  const { id } = useParams();
  const { isLoading, isSuccess, isFetching, isError, refetch, error, data } =
    useGetProjectQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const [
    createProject,
    {
      isLoading: sessionLoading,
      isSuccess: sessionIsSuccess,
      data: sessionData,
    },
  ] = useAddSessionMutation();

  console.log(sessionIsSuccess, "asasdasd");
  const distributeArrayElements = (labels, numRows) => {
    const duplicatedArray = Array.from({ length: numRows }, () => [...labels]);
    return duplicatedArray;
  };

  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.project);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);
  const dynamicGridRef = useRef(null);

  const [distributedLabels, setDistributedLabels] = useState(
    distributeArrayElements(
      projectData?.session[0]?.case[currentCaseIndex]?.labels,
      projectData?.session[0]?.case[currentCaseIndex]?.rows_number
    )
  );

  useEffect(() => {
    if (sessionIsSuccess) {
      toast.success("Session Created");
      // dispatch(resetLabels({ caseIndex: currentCaseIndex }));
      // dispatch(resetOptions({ caseIndex: currentCaseIndex }));
    }
  }, [sessionIsSuccess]);

  useEffect(() => {
    if (data) {
      dispatch(addProject(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(addProject(data));
  }, [id]);

  const handleNextCase = () => {
    setCurrentCaseIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackCase = () => {
    setCurrentCaseIndex((prevIndex) => prevIndex - 1);
  };

  // Check if there are more cases to display
  const hasMoreCases =
    currentCaseIndex < (data?.session[0]?.case.length || 0) - 1;

  function updateTargetArray(labelsArray, targetArray) {
    labelsArray?.forEach?.((labels, rowIndex) => {
      labels?.forEach?.((label) => {
        if (label.checked) {
          const labelValue = label.value;
          const score = rangeValue; // Assuming rangeValue starts from 0

          // Push the value and score of the selected label to both instances in targetArray
          targetArray[
            rowIndex *
              projectData?.session[0]?.case[currentCaseIndex]?.cols_number
          ].labels.push(labelValue);
          targetArray[
            rowIndex *
              projectData?.session[0]?.case[currentCaseIndex]?.cols_number +
              1
          ].labels.push(labelValue);

          targetArray[
            rowIndex *
              projectData?.session[0]?.case[currentCaseIndex]?.cols_number
          ].score = score;
          targetArray[
            rowIndex *
              projectData?.session[0]?.case[currentCaseIndex]?.cols_number +
              1
          ].score = score;
        }
      });
    });

    return targetArray;
  }

  let slices = [];
  projectData?.session?.[0]?.case?.[currentCaseIndex].category_type.forEach(
    (category) => {
      const checkedOptions = category?.options?.filter(
        (option) => option.checked
      );
      const checkoedOptionsValues = checkedOptions?.map(
        (option) => option.value
      );

      slices.push({
        project_id: projectData?.id, // You can set the appropriate project_id here
        case_id: projectData?.session?.[0]?.case?.[currentCaseIndex]?.id,
        category_type: category.id,
        image_id: 1,
        options: checkoedOptionsValues,
        labels: [],
        score: 0,
      });
    }
  );

  updateTargetArray(
    projectData?.session?.[0]?.case?.[currentCaseIndex]?.newLabels,
    slices
  );

  const handleValueChange = (catIdx, optIdx) => {
    console.log(catIdx, optIdx, "identifier");
    dispatch(
      changeCheckBox({
        optIdx,
        currentCaseIndex,
        catIdx,
      })
    );
  };

  const handleLabelSelect = (rowIndex, labelIdx) => {
    dispatch(changeLabelCheckBox({ rowIndex, labelIdx, currentCaseIndex }));
  };

  useEffect(() => {
    if (projectData) {
      dispatch(replaceLabels({ currentCaseIndex, distributedLabels }));
    }
  }, [distributedLabels, id, projectData]);

  useEffect(() => {
    if (dynamicGridRef.current) {
      if (projectData?.session[0]?.case[currentCaseIndex]?.cols_number) {
        dynamicGridRef.current.style[
          "grid-template-columns"
        ] = `repeat(${projectData?.session[0]?.case[currentCaseIndex]?.cols_number}, minmax(0, 1fr))`;
      } else {
        dynamicGridRef.current.style[
          "grid-template-columns"
        ] = `repeat(2, minmax(0, 1fr))`;
      }
    }
  }, [
    currentCaseIndex,
    projectData,
    projectData?.session[0]?.case[currentCaseIndex]?.cols_number,
    id,
  ]);

  console.log(slices, "kljljk090");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="">
        <div className="flex-between py-10">
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
                {/* <CategoryCard
                  id={id}
                  idx={2000}
                  images={
                    projectData?.session[0]?.case[currentCaseIndex]
                      ?.reference_folder?.image_list
                  }
                  hideTitle
                /> */}
              </div>
            </div>

            <div ref={dynamicGridRef} className={`grid w-full relative `}>
              {projectData?.session[0]?.case[
                currentCaseIndex
              ]?.category_type?.map((catItem, catIdx) => {
                console.log(catIdx, "catIdx");
                return (
                  <div key={catItem?.id} className="flex flex-col gap-4 p-1">
                    <CategoryCard
                      id={id}
                      cat={catItem.category}
                      idx={catItem.id}
                      type={catItem.type}
                      images={catItem.image_list}
                      catItem={catItem}
                      handleValueChange={handleValueChange}
                      // setZoomActive={setZoomActive}
                    />

                    {/* Render button after every 2 items */}
                    {(catItem + 1) %
                      projectData?.session[0].case[currentCaseIndex]
                        .cols_number ===
                      0 && (
                      <div className="grid grid-col-12 mt-4">
                        {isSynced.includes(catItem + 1) ? (
                          <Button
                            onClick={() =>
                              handleRemoveSync(
                                catItem +
                                  projectData?.session[0].case[currentCaseIndex]
                                    .cols_number
                              )
                            }
                            btnText="Remove Sync"
                            className="bg-rose-700 text-white"
                          />
                        ) : (
                          <Button
                            onClick={() => handleSync(catItem + 1)}
                            btnText="Sync"
                          />
                        )}
                      </div>
                    )}

                    {/* {(catIdx + 1) % 2 === 0 && (
                      <div className="col-span-2 flex items-center justify-center w-full mt-8 mb-8 ">
                        <div className="w-[100%] absolute left-0 px-32 ">
                          <Button btnText="Sync" nobg onClick={handleSync} />
                        </div>
                      </div>
                    )} */}
                  </div>
                );
              })}

              {/* Centered button spanning full width */}
            </div>
            <div className="w-full flex m-auto px-32 py-5">
              <div className="w-[100%]">
                <Button
                  btnText="Submit"
                  type="button"
                  onClick={() => createProject({ slices_data: slices })}
                />
              </div>
            </div>
          </div>

          <div className="w-[200px] flex flex-col  max-md:hidden primary-border-color p-2 h-auto">
            <div className="h-[400px]"></div>
            <div className="flex flex-col gap-6">
              {projectData?.session[0]?.case[currentCaseIndex].newLabels?.map(
                (row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-col gap-4 p-1 h-[600px]"
                  >
                    {row?.map?.((item, index) => {
                      if (item?.value?.includes("-")) {
                        const [before, after] = item.value.split("-");
                        return (
                          <RangeSelector
                            key={index}
                            before={before}
                            after={after}
                            setRangeValue={setRangeValue}
                            rangeValue={rangeValue}
                          />
                        );
                      } else {
                        return (
                          <div
                            className=" w-full flex items-center gap-24"
                            key={item?.id}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              id={item.id}
                              checked={item.checked}
                            />
                            <label
                              htmlFor={item.id}
                              className="flex items-center cursor-pointer"
                            >
                              <div
                                className="w-6 h-6 primary-border-color rounded-md flex items-center justify-center mr-2 transition duration-300 ease-in-out"
                                onClick={() => {
                                  handleLabelSelect(rowIndex, index);
                                }}
                              >
                                {item?.checked && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <circle
                                      cx="8"
                                      cy="8"
                                      r="8"
                                      fill="#C8BCF6"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[#4F4F4F] body-light">
                                {item?.value}
                              </span>
                            </label>
                          </div>
                        );
                      }
                    })}
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col mb-4 mt-10 h-[620px] bg-red">
              {/* <RangeSelector /> */}
              <div className="flex flex-col gap-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonPage;
