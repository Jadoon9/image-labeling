import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

import CategoryCardItem from "../components/CategoryCardItem";
import RangeSelector from "../components/RangeSelector";
import Checkbox from "../components/CheckBox";
import CategoryCard from "../components/CategoryCard";
import CreateSubject from "../components/models/CreateSubject";
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

import image1 from "../assets/dicom data/case1/AI_ABC/1.dcm";
import image2 from "../assets/dicom data/case1/AI_ABC/2.dcm";

const categories = [
  { cat: 1, type: 1 },
  { cat: 2, type: 2 },
  { cat: 3, type: 3 },
  { cat: 4, type: 4 },
  { cat: 5, type: 5 },
  { cat: 6, type: 6 },
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

const PersonPage = () => {
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
    <div className="">
      <div className="flex-between py-10 ">
        <BackButton />
        <h3 className="h3-bold">Person 1</h3>
        <div className="w-48">
          <Button btnText="Next" showIcon />
        </div>
      </div>

      <div className="gap-2 flex ">
        <div className=" flex-1 px-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
            {categories.map((item, index) => (
              <div key={index} className=" flex flex-col gap-4 p-4">
                <CategoryCard
                  cat={item.cat}
                  type={item.type}
                  handleFileChange={handleFileChange}
                  setZoomActive={setZoomActive}
                  setMouseWheelActive={setMouseWheelActive}
                  handleFullscreenToggle={handleFullscreenToggle}
                  setWwwcActive={setWwwcActive}
                  handleReset={handleReset}
                  imageIds={imageIds}
                />
                {/* <div className="">
                  <Checkbox text="Option 1" />
                  <Checkbox text="Option 2" />
                </div>
                <div className="">
                  <Checkbox text="Option 3" />
                  <Checkbox text="Option 4" />
                </div> */}
              </div>
            ))}
          </div>

          {/* <div className="flex items-center justify-center w-full space-x-4 my-5">
            <div className="w-[80%]">
              <Button btnText="Sync" nobg />
            </div>
          </div> */}

          <div className="w-100 px-5 flex-center">
            <div className="w-[80%] mt-10 pb-2">
              <Button btnText="Submit" />
            </div>
          </div>
        </div>

        <div className="w-[200px] flex flex-col  max-md:hidden justify-around primary-border-color p-2 h-auto">
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
          <div>
            <RangeSelector />
            <div className="flex flex-col gap-5">
              <Checkbox text="Option 1" />
              <Checkbox text="Option 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
