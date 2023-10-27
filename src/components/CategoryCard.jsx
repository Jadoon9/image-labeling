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

const StackScrollSynchronizer = cornerstoneTools.StackScrollSynchronizer;

const CategoryCard = ({
  hideTitle,
  cat,
  type,
  images,
  elementId1,
  elementId2,
  isSynced,
  // setZoomActive,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let element;
  let elementId = `dicomImage${cat}`;

  // ... (other functions remain unchanged)

  const elementIds = [elementId, elementId1, elementId2];
  console.log(elementIds, "90898");

  const handleFullscreenToggle = () => {
    const element = document.getElementById(`${elementId}`);

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  const handleExitFullscreen = () => {
    // Exit fullscreen mode
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      // Update the state to indicate that fullscreen mode is not active
      setIsFullscreen(false);
    }
  };

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

  // loadAndViewImage`${elementId}`;

  useEffect(() => {
    element = document.getElementById(`${elementId}`);
    cornerstone.enable(element);
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageIds = await Promise.all(
          images.map(async (imagePath) => {
            const imageId = `wadouri:${imagePath}`;
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

        // Add the stack to the cornerstone tools
        cornerstoneTools.addStackStateManager(element, ["stack"]);
        cornerstoneTools.addToolState(element, "stack", stack);

        // Enable the StackScrollMouseWheelTool to enable scrolling through the stack
        const StackScrollMouseWheelTool =
          cornerstoneTools.StackScrollMouseWheelTool;
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  const handleFileChange = (imageUrls) => {
    debugger;
    const files = Array.from(imageUrls.target.files);
    setUploadedFiles(files);

    const imageIds = files.map((file) => {
      return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    });

    setImageIds(imageIds);

    const stack = {
      currentImageIdIndex: 0,
      imageIds: imageIds,
    };

    cornerstone.loadAndCacheImage(imageIds[0]).then((image) => {
      const element = document.getElementById(`${elementId}`);
      cornerstone.displayImage(element, image);
      cornerstoneTools.addStackStateManager(element, ["stack"]);
      cornerstoneTools.addToolState(element, "stack", stack);
    });

    // Add the Stack Scroll tool and make it active
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  };

  const setZoomActive = (element, elementId1, elementId2) => {
    const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
    const PanTool = cornerstoneTools.PanTool;
    if (isSynced && elementId1 && elementId2) {
      cornerstoneTools.setToolActive(
        ZoomMouseWheelTool,
        { mouseButtonMask: 1 },
        elementId1
      );
      cornerstoneTools.setToolActive(
        ZoomMouseWheelTool,
        { mouseButtonMask: 1 },
        elementId2
      );
      cornerstoneTools.addTool(ZoomMouseWheelTool);
      cornerstoneTools.setToolActive("ZoomMouseWheel", {
        mouseButtonMask: 1,
      });

      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
    } else {
      cornerstoneTools.addTool(ZoomMouseWheelTool);
      cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });

      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
    }
  };

  const setMouseWheelActive = (e) => {
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  };

  const setLengthActive = (e) => {
    const LengthTool = cornerstoneTools.LengthTool;
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.setToolActive("Length", { mouseButtonMask: 1 });
  };

  const setWwwcActive = (e) => {
    const WwwcTool = cornerstoneTools.WwwcTool;
    cornerstoneTools.addTool(WwwcTool);
    cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
  };

  const setScrollActive = (elementId1, elementId2) => {
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  };

  return (
    <div className="w-full custom-shadow  p-1 rounded-[22px] ">
      {!hideTitle && <h3 className="h3-bold">Category {cat}</h3>}
      {!hideTitle && <p className="body-light mt-2">Type {type}</p>}

      <div className="flex flex-col overflow-scroll custom-scrollbar ">
        <div onContextMenu={() => false} unselectable="on">
          <div id={elementId} />
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
            onClick={() => setZoomActive(elementId, elementId1, elementId2)}
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
            onClick={() => setScrollActive(elementId1, elementId2)}
          >
            <img src={gameIcon} alt="rest" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
