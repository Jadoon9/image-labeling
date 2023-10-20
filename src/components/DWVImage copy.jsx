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
const fontFamily =
  "Work Sans, Roboto, OpenSans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif";

cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

// Set the tool width
cornerstoneTools.toolStyle.setToolWidth(2);

// Set color for inactive tools
cornerstoneTools.toolColors.setToolColor("rgb(255, 255, 0)");

// Set color for active tools
cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)");

const DWVImage = ({ dicomImage }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  let element;

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

  const staticImageUrls = [image1, image2];

  useEffect(() => {
    element = document.getElementById("dicomImage");
    cornerstone.enable(element);
  });

  useEffect(() => {
    // handleStaticData();
  }, []);

  const handleStaticData = () => {
    // Define an array of static DICOM image URLs or file paths
    // debugger;
    const imageIds = staticImageUrls.map((imageUrl) => {
      return cornerstoneWADOImageLoader.wadouri.fileManager.add(imageUrl);
    });

    setImageIds(imageIds);

    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;

    const stack = {
      currentImageIdIndex: 0,
      imageIds,
    };

    cornerstone.loadImage(imageIds[0]).then((image) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.addStackStateManager(element, ["stack"]);
      cornerstoneTools.addToolState(element, "stack", stack);
    });

    setTimeout(() => {
      imageIds.forEach((imageId) => {
        const thumbnailElement = document.getElementById(imageId);
        cornerstone.enable(thumbnailElement);
        cornerstone.loadImage(imageId).then((image) => {
          cornerstone.displayImage(thumbnailElement, image);
          cornerstoneTools.addStackStateManager(element, ["stack"]);
          cornerstoneTools.addToolState(element, "stack", stack);
        });
      });
    }, 1000);

    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  };

  const handleFileChange = (e) => {
    // debugger;
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
    const imageIds = files.map((file) => {
      return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    });

    setImageIds(imageIds);
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;

    const stack = {
      currentImageIdIndex: 0,
      imageIds,
    };
    cornerstone.loadImage(imageIds[0]).then((image) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.addStackStateManager(element, ["stack"]);
      cornerstoneTools.addToolState(element, "stack", stack);
    });
    setTimeout(() => {
      imageIds.forEach((imageId) => {
        const thumbnailElement = document.getElementById(imageId);
        cornerstone.enable(thumbnailElement);
        cornerstone.loadImage(imageId).then((image) => {
          cornerstone.displayImage(thumbnailElement, image);
          cornerstoneTools.addStackStateManager(element, ["stack"]);
          cornerstoneTools.addToolState(element, "stack", stack);
        });
      });
    }, 1000);
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
        <input type="file" onChange={handleFileChange} multiple />
        <div className="flex-center gap-10 ">
          <button
            onClick={setEraserActive}
            className="p-1 custom-shadow rounded-[8px] h-8 w-8 "
          >
            <img src={restartIon} alt="rest" className="h-7 w-7" />
          </button>
          <button
            className="p-1 custom-shadow rounded-[8px] h-8 w-8"
            onClick={setMouseWheelActive}
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
            className="p-1 custom-shadow rounded-[8px] h-8 w-8"
            onClick={setZoomActive}
          >
            <img src={gameIcon} alt="rest" className="h-7 w-7" />
          </button>
        </div>
        {/* <button onClick={setLengthActive} style={{ marginLeft: "10px" }}>
          Length
        </button> */}

        {/* <button style={{ marginLeft: "10px" }}>Eraser</button> */}

        <div id="thumbnail-list">
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

        <div onContextMenu={() => false} className="" unselectable="on">
          <div id="dicomImage" />
        </div>
      </div>
    </>
  );
};

export default DWVImage;
