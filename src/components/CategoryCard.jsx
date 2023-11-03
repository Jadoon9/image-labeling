import React, { useEffect, useRef, useState } from "react";

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
  synchronizer,
  isSynced,
  setCurrentSlice,
  // elementRef,
  // setZoomActive,
}) => {
  const elementRef = useRef(null);
  const baseUrl = "http://127.0.0.1:8000/media/";
  const scheme = "wadouri";
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Check if elementRef.current is truthy before accessing its properties
        if (elementRef.current) {
          const imageIds = images.map((imagePath) => {
            const imageId = `${scheme}:${baseUrl}${imagePath?.image}`;
            return imageId;
          });

          // Load and display the first image
          const element = elementRef.current;
          cornerstone.enable(element);
          const image = await cornerstone.loadImage(imageIds[0]);
          const viewport = cornerstone.getDefaultViewportForImage(
            element,
            image
          );

          cornerstone.displayImage(element, image, viewport);

          // Create a stack object and assign imageIds to it
          const stack = {
            currentImageIdIndex: 0,
            imageIds: imageIds,
          };

          // Add the stack to the cornerstone tools
          cornerstoneTools.addStackStateManager(element, ["stack"]);
          cornerstoneTools.addToolState(element, "stack", stack);
          // setCurrentSlice(0);

          // Enable the StackScrollMouseWheelTool to enable scrolling through the stack
          setScrollActive();
          synchronizer.add(element);
        } else {
          console.error("elementRef is null or undefined.");
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  const setZoomActive = (event) => {
    // Check if elementRef.current is truthy before enabling zoom functionality
    if (elementRef.current) {
      // Load and display the first image
      const element = elementRef.current;
      cornerstone.enable(element);

      const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
      const PanTool = cornerstoneTools.PanTool;

      cornerstoneTools.addTool(ZoomMouseWheelTool);
      cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });

      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
    } else {
      console.error(
        "elementRef is null or undefined. Cannot enable zoom functionality."
      );
    }
  };

  const setWwwcActive = (e) => {
    // Check if elementRef.current is truthy before enabling Wwwc tool functionality
    if (elementRef.current) {
      const WwwcTool = cornerstoneTools.WwwcTool;
      cornerstoneTools.addTool(WwwcTool);
      cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    } else {
      console.error(
        "elementRef is null or undefined. Cannot enable Wwwc tool functionality."
      );
    }
  };

  const setScrollActive = () => {
    // Check if elementRef.current is truthy before enabling StackScrollMouseWheelTool functionality
    if (elementRef.current) {
      const StackScrollMouseWheelTool =
        cornerstoneTools.StackScrollMouseWheelTool;
      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.setToolActive("StackScrollMouseWheel", {
        mouseWheelCallback: (e) => {
          // Get the current stack data
          const stackToolData = cornerstoneTools.getToolState(
            elementRef.current,
            "stack"
          );
          if (
            stackToolData &&
            stackToolData.data &&
            stackToolData.data.length > 0
          ) {
            const stack = stackToolData.data[0];

            // Update the current slice number
            // setCurrentSlice(stack.currentImageIdIndex);
          }

          // Call the default behavior of StackScrollMouseWheelTool
          return StackScrollMouseWheelTool.mouseWheelCallback(e);
        },
      });
    } else {
      console.error(
        "elementRef is null or undefined. Cannot enable Scroll functionality."
      );
    }
  };

  const handleReset = () => {
    // Check if elementRef.current is truthy before resetting the Cornerstone element
    if (elementRef.current) {
      const element = elementRef.current;

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
    } else {
      console.error(
        "elementRef is null or undefined. Cannot reset the Cornerstone element."
      );
    }
  };

  return (
    <div className="w-full custom-shadow  p-1 rounded-[22px] ">
      {!hideTitle && <h3 className="h3-bold">Category : {cat}</h3>}
      {!hideTitle && <p className="body-light mt-2">Type : {type}</p>}

      <div className="flex flex-col overflow-scroll custom-scrollbar ">
        <div onContextMenu={() => false} unselectable="on">
          <div ref={elementRef} />
        </div>

        <div className="flex-center gap-1 mb-1 ">
          <button
            className="p-1 custom-shadow rounded-[8px] h-6 w-6 "
            onClick={handleReset}
          >
            <img src={restartIon} alt="rest" className="" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px] h-6 w-6  "
            onClick={setZoomActive}
          >
            <img src={zoomIcon} alt="rest" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px]h-6 w-6  "
            onClick={setWwwcActive}
          >
            <img src={dropIcon} alt="rest" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px]  h-6 w-6   "
            onClick={setScrollActive}
          >
            <img src={gameIcon} alt="rest" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
