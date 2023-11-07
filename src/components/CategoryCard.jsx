import React, { useEffect, useState } from "react";

import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";

import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.init();
cornerstoneWADOImageLoader.webWorkerManager.initialize();

cornerstoneTools.init({
  mouseEnabled: true,
  touchEnabled: true,
  globalToolSyncEnabled: false,
  showSVGCursors: false,
});

const CategoryCard = ({
  hideTitle,
  cat,
  type,
  images,
  idx,
  id,
  catItem,
  handleValueChange,
}) => {
  const [imageIds, setImageIds] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  let element;
  let elementId = `dicomImage${idx}`;

  const handleReset = () => {
    const element = document.getElementById(`${elementId}`);

    // Reset zoom and pan
    cornerstone.reset(element);

    // Reset other tools if needed
    const stack = cornerstoneTools.getToolState(element, "stack");
    if (stack && stack.data && stack.data.length > 0) {
      stack.data[0].currentImageIdIndex = 0;
    }

    // Reset other tools as necessary (example: length tool)
    const lengthToolData = cornerstoneTools.getToolState(element, "Length");
    if (
      lengthToolData &&
      lengthToolData.data &&
      lengthToolData.data.length > 0
    ) {
      lengthToolData.data[0].measurementData.measurementValue = 0;
    }

    // Call updateImage to redraw the image after reset
    cornerstone.updateImage(element);
  };
  const baseUrl = "http://127.0.0.1:8000/";
  const scheme = "wadouri";
  console.log(catItem, "99898");
  // loadAndViewImage`${elementId}`;

  useEffect(() => {
    element = document.getElementById(`${elementId}`);
    cornerstone.enable(element);
  });
  console.log(element, "cjjhkjh");
  const synchronizer = new cornerstoneTools.Synchronizer(
    "CornerstoneNewImage",
    cornerstoneTools.updateImageSynchronizer
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageIds = await Promise.all(
          images.map(async (imagePath) => {
            const imageId = `${scheme}:${baseUrl}${imagePath?.image}`;
            return imageId;
          })
        );

        setImageIds(imageIds);

        // Load and display the first image
        const element = document.getElementById(elementId);
        cornerstone.enable(element);

        const image = await cornerstone.loadImage(imageIds[0]);
        const viewport = cornerstone.getDefaultViewportForImage(element, image);

        cornerstone.displayImage(element, image, viewport);

        // Create a stack object and assign imageIds to it
        const stack = {
          currentImageIdIndex: 0,
          imageIds: imageIds,
        };

        console.log(stack, "ceckstat");
        // Add the stack to the cornerstone tools
        cornerstoneTools.addStackStateManager(element, ["stack"]);
        cornerstoneTools.addToolState(element, "stack", stack);

        // Enable the StackScrollMouseWheelTool to enable scrolling through the stack
        setScrollActive();
        synchronizer.add(element);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, [id, images]);

  const setZoomActive = (event) => {
    console.log(event, "evnhe");
    // Load and display the first image
    const element = document.getElementById(elementId);
    cornerstone.enable(element);

    const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
    const PanTool = cornerstoneTools.PanTool;

    cornerstoneTools.addTool(ZoomMouseWheelTool);
    cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });

    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
  };

  const setWwwcActive = (e) => {
    const WwwcTool = cornerstoneTools.WwwcTool;
    cornerstoneTools.addTool(WwwcTool);
    cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
  };

  const setScrollActive = () => {
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  };

  console.log(idx, "adasd1231");

  return (
    <>
      <div className="w-full custom-shadow  p-1 rounded-[22px] min-h-[300px] flex flex-col justify-between">
        <div className="px-4 pt-4">
          {!hideTitle && <h3 className="h3-bold">Category : {cat}</h3>}
          {!hideTitle && <p className="body-light mt-2">Type : {type}</p>}
        </div>

        <div className="">
          <div
            onContextMenu={() => false}
            unselectable="on"
            className="overflow-hidden"
          >
            <div id={elementId} className="overflow-hidden relative">
              {!images?.length && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <p className="body-bold">No Images Found</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-center gap-1 mb-1 ">
            <button
              className="p-1 custom-shadow  cursor-pointer rounded-[8px] h-6 w-6 "
              onClick={handleReset}
            >
              <img src={restartIon} alt="rest" className="" />
            </button>
            <button
              className="p-1 custom-shadow  cursor-pointer rounded-[8px] h-6 w-6  "
              onClick={(e) => setZoomActive(e)}
            >
              <img src={zoomIcon} alt="rest" />
            </button>
            <button
              className="p-1 custom-shadow cursor-pointer rounded-[8px]h-6 w-6  "
              onClick={setWwwcActive}
            >
              <img src={dropIcon} alt="rest" />
            </button>
            <button
              className="p-1 custom-shadow cursor-pointer rounded-[8px]  h-6 w-6   "
              onClick={setScrollActive}
            >
              <img src={gameIcon} alt="rest" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-2">
        {catItem?.options?.map((item, optIdx) => (
          <div className=" w-full flex items-center gap-24" key={item?.id}>
            {console.log(optIdx, "asdasd")}
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
                onClick={() => handleValueChange(idx, optIdx)}
              >
                {item?.checked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="8" fill="#C8BCF6" />
                  </svg>
                )}
              </div>
              <span className="text-[#4F4F4F] body-light">{item?.value}</span>
            </label>
          </div>
          // <input
          //   onKeyUpey={optIdx}
          //   type="checkbox"
          //   checked={item.checked}
          //   onChange={() =>
          //     handleValueChange(caseIdx, optIdx)
          //   }
          // />
        ))}
      </div>
    </>
  );
};

export default CategoryCard;
