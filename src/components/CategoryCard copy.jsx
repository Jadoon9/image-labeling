import React, { useEffect, useState } from "react";

import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";
import image1 from "../assets/dicom data/case1/AI_ABC/1.dcm";
import image2 from "../assets/dicom data/case1/AI_ABC/2.dcm";

import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

const imagesData = [
  "../assets/dicom data/case1/AI_ABC/1.dcm",
  "../assets/dicom data/case1/AI_ABC/2.dcm",
];
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.init();

cornerstoneTools.init({
  mouseEnabled: true,
  touchEnabled: true,
  globalToolSyncEnabled: false,
  showSVGCursors: false,
});

// cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

// Set the tool width
cornerstoneTools.toolStyle.setToolWidth(1);

// Set color for inactive tools
cornerstoneTools.toolColors.setToolColor("rgb(255, 255, 0)");

// Set color for active tools
cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)");

const CategoryCard = ({ hideTitle, cat, type, images }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let element;
  let elementId = `dicomImag${cat}`;
  // ... (other functions remain unchanged)

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

  const loadAndViewImage = (imageId) => {
    const element = document.getElementById(`${elementId}`);
    const start = new Date().getTime();
    cornerstone.loadImage(imageId).then(
      function (image) {
        console.log(image);
        const viewport = cornerstone.getDefaultViewportForImage(element, image);
        cornerstone.displayImage(element, image, viewport);
      },
      function (err) {
        alert(err);
      }
    );
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

  // useEffect(() => {
  //   debugger;
  //   const files = imagesData;
  //   setUploadedFiles(files);

  //   const imageIds = files.map((file) => {
  //     return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
  //   });

  //   setImageIds(imageIds);

  //   const stack = {
  //     currentImageIdIndex: 0,
  //     imageIds: imageIds,
  //   };

  //   cornerstone.loadAndCacheImage(imageIds[0]).then((image) => {
  //     const element = document.getElementById(`${elementId}`);
  //     cornerstone.displayImage(element, image);
  //     cornerstoneTools.addStackStateManager(element, ["stack"]);
  //     cornerstoneTools.addToolState(element, "stack", stack);
  //   });

  //   // Add the Stack Scroll tool and make it active
  //   const StackScrollMouseWheelTool =
  //     cornerstoneTools.StackScrollMouseWheelTool;
  //   cornerstoneTools.addTool(StackScrollMouseWheelTool);
  //   cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  // }, []);

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

  const setZoomActive = (e) => {
    const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;

    cornerstoneTools.addTool(ZoomMouseWheelTool);
    cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });
    const PanTool = cornerstoneTools.PanTool;

    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
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

  const setEraserActive = (e) => {
    const EraserTool = cornerstoneTools.EraserTool;
    cornerstoneTools.addTool(EraserTool);
    cornerstoneTools.setToolActive("Eraser", { mouseButtonMask: 1 });
  };
  return (
    <div className="w-full custom-shadow p-5 rounded-[22px]">
      {!hideTitle && <h3 className="h3-bold">Category {cat}</h3>}
      {!hideTitle && <p className="body-light mt-2">Type {type}</p>}

      <div className="flex flex-col justify-between overflow-scroll custom-scrollbar  h-[250px] ">
        <input
          type="file"
          className="body-light"
          onChange={handleFileChange}
          multiple
        />

        {/* <button onClick={setMouseWheelActive} style={{ marginLeft: "10px" }}>
            Scroll
          </button> */}

        <div className="" id="thumbnail-list">
          {imageIds.map((imageId) => {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onContextMenu={() => false}
                unselectable="on"
                onMouseDown={() => false}
                onSelect={() => false}
              >
                <div
                  id={imageId}
                  className="rounded-[8px]"
                  onContextMenu={() => false}
                  unselectable="on"
                  onMouseDown={() => false}
                  onSelect={() => false}
                />
              </a>
            );
          })}
        </div>

        {console.log(isFullscreen, "asdasda")}
        {isFullscreen && (
          <button
            className="absolute  z-10 top-32 right-2 p-2 bg-white h-20 w-20  text-red rounded-full"
            onClick={handleExitFullscreen}
          >
            Xasdad
          </button>
        )}

        <div onContextMenu={() => false} unselectable="on">
          <div id={elementId} />
        </div>

        <div className="flex-center gap-10 mb-1 ">
          <button
            className="p-1 custom-shadow rounded-[8px] h-8 w-8 "
            onClick={handleReset}
          >
            <img src={restartIon} alt="rest" className="h-7 w-7" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px] h-8 w-8 "
            onClick={setZoomActive}
          >
            <img src={zoomIcon} alt="rest" className="h-7 w-7" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px] h-8 w-8"
            onClick={setWwwcActive}
          >
            <img src={dropIcon} alt="rest" className="h-7 w-7" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px] h-8 w-8 "
            onClick={handleFullscreenToggle}
          >
            <img src={gameIcon} alt="rest" className="h-7 w-7" />
          </button>
        </div>
        {/* {images.map((img, idx) => (
          <DwvImage image={img} />

        
        ))} */}
        {/* <UploadFiles img={imageUplaod} /> */}
        {/* {image2 && <UploadFiles img={imageUplaod} />} */}
      </div>
    </div>
  );
};

export default CategoryCard;
