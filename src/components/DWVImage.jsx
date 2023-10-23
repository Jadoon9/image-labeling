import React, { useEffect, useState } from "react";

import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";

import image1 from "../assets/dicom data/case1/AI_ABC/1.dcm";
import image2 from "../assets/dicom data/case1/AI_ABC/2.dcm";

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

const DWVImage = ({ dicomImage }) => {
  const images = [image1, image2];
  console.log(dicomImage, "dicmmm");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let element;

  // ... (other functions remain unchanged)

  const handleFullscreenToggle = () => {
    const element = document.getElementById("dicomImage");

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
  const loadAndViewImage = (imageId) => {
    const element = document.getElementById("dicomImage");
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
    const element = document.getElementById("dicomImage");

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

  // loadAndViewImage(dicomImage);

  useEffect(() => {
    element = document.getElementById("dicomImage");
    cornerstone.enable(element);
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
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
      const element = document.getElementById("dicomImage");
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
    <>
      <div>
        <h2>DICOM viewer demo</h2>
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={setZoomActive}>Zoom/Pan</button>
        <button onClick={setMouseWheelActive} style={{ marginLeft: "10px" }}>
          Scroll
        </button>
        <button onClick={handleFullscreenToggle} style={{ marginLeft: "10px" }}>
          Length
        </button>
        <button onClick={setWwwcActive} style={{ marginLeft: "10px" }}>
          WWWC
        </button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Eraser
        </button>
        <div className="dicom-wrapper">
          <div className="thumbnail-selector">
            <div className="thumbnail-list" id="thumbnail-list">
              {imageIds.map((imageId) => {
                return (
                  <a
                    onContextMenu={() => false}
                    unselectable="on"
                    onMouseDown={() => false}
                    onSelect={() => false}
                  >
                    <div
                      id={imageId}
                      className="thumbnail-item"
                      onContextMenu={() => false}
                      unselectable="on"
                      onMouseDown={() => false}
                      onSelect={() => false}
                    />
                  </a>
                );
              })}
            </div>
          </div>
          <div
            onContextMenu={() => false}
            className="dicom-viewer"
            unselectable="on"
          >
            <div id="dicomImage" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DWVImage;
