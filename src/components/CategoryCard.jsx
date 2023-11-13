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
import { RenderingEngine } from "@cornerstonejs/core";
import { ViewportType } from "@cornerstonejs/core/dist/esm/enums";
import * as cornerstone3D from "@cornerstonejs/core";
import * as cornerstoneTools3D from "@cornerstonejs/tools";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone3D;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

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
  const toolGroupId = "myToolGroup" + idx;
  const viewportId = "CT_AXIAL_STACK" + idx;
  const renderingEngineId = "myRenderingEngine" + idx;
  const [toolName, setToolName] = useState("");
  const ref = useRef(null);

  const baseUrl = "http://127.0.0.1:8000/";
  const scheme = "wadouri";
  console.log(catItem, "99898");

  useEffect(() => {
    const loadImages = async () => {
      if (cornerstone3D.getRenderingEngine(renderingEngineId)) return;
      debugger;
      const imageIds = await Promise.all(
        images.map(async (imagePath) => {
          const imageId = `${scheme}:${baseUrl}${imagePath?.image}`;
          return imageId;
        })
      );

      const content = document.getElementById(idx);
      const element = document?.createElement("div");
      element.oncontextmenu = (e) => e.preventDefault();
      element.style.width = "300px";
      element.style.height = "270px";
      content.appendChild(element);

      const renderingEngine = new RenderingEngine(renderingEngineId);

      const viewportInput = {
        viewportId,
        element,
        type: ViewportType.STACK,
      };

      renderingEngine.enableElement(viewportInput);
      const viewport = renderingEngine.getViewport(viewportId);
      viewport.setUseCPURendering(true);
      viewport.setStack(imageIds, 0);

      const toolGroup =
        cornerstoneTools3D.ToolGroupManager.createToolGroup(toolGroupId);

      if (toolGroup) {
        toolGroup.addTool(cornerstoneTools3D.WindowLevelTool.toolName);
        toolGroup.addTool(cornerstoneTools3D.ZoomTool.toolName);
        toolGroup.addTool(cornerstoneTools3D.PanTool.toolName);
        toolGroup.addTool(
          cornerstoneTools3D.StackScrollMouseWheelTool.toolName
        );

        toolGroup.addViewport(viewportId, renderingEngineId);
        toolGroup.setToolActive(cornerstoneTools3D.PanTool.toolName, {
          bindings: [
            {
              mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
            },
          ],
        });
      }

      // if (content.children.length > 0) {
      //   // Remove the first child
      //   content.removeChild(content.children[0]);
      // }
    };
    loadImages();
    return () => {
      const content = document.getElementById(idx);
      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }
    };
  }, [images, id]);

  const handleReset = () => {
    setToolName("");
    const renderingEngine = cornerstone3D.getRenderingEngine(renderingEngineId);
    // const viewport = renderingEngine.getViewport(viewportId);
    // viewport.setPan([0, 0]);
    // viewport.setZoom(1);
    // viewport.render();
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    toolGroup.setToolDisabled(cornerstoneTools3D.ZoomTool.toolName);
    toolGroup.setToolDisabled(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );
    toolGroup.setToolDisabled(cornerstoneTools3D.WindowLevelTool.toolName);
    toolGroup.setToolActive(cornerstoneTools3D.PanTool.toolName, {
      bindings: [
        {
          mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
        },
      ],
    });
  };

  const setZoomActive = (e) => {
    setToolName("zoom");

    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);

    // Enable ZoomTool with bindings for mouse wheel
    toolGroup.setToolActive(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );

    // Enable PanTool with touch
    toolGroup.setToolActive(cornerstoneTools3D.PanTool.toolName, {
      touch: true, // Enable touch for panning
    });

    // Disable other tools
    toolGroup.setToolDisabled(cornerstoneTools3D.WindowLevelTool.toolName);
    toolGroup.setToolDisabled(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );
  };

  const setWwwcActive = (e) => {
    setToolName("wwc");
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    toolGroup.setToolDisabled(cornerstoneTools3D.ZoomTool.toolName);
    toolGroup.setToolDisabled(cornerstoneTools3D.PanTool.toolName);
    toolGroup.setToolDisabled(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );
    toolGroup.setToolActive(cornerstoneTools3D.WindowLevelTool.toolName, {
      bindings: [
        {
          mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
        },
      ],
    });
  };

  const setScrollActive = () => {
    setToolName("stackscroll");
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    toolGroup.setToolDisabled(cornerstoneTools3D.ZoomTool.toolName);
    toolGroup.setToolDisabled(cornerstoneTools3D.PanTool.toolName);
    toolGroup.setToolDisabled(cornerstoneTools3D.WindowLevelTool.toolName);
    toolGroup.setToolActive(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );
  };

  return (
    <>
      <div className="w-full custom-shadow  p-1 rounded-[22px] min-h-[300px] flex flex-col justify-between">
        <div className="px-4 pt-4">
          {!hideTitle && <h3 className="h3-bold">Category : {cat}</h3>}
          {!hideTitle && <p className="body-light mt-2">Type : {type}</p>}
        </div>

        <div id={idx} ref={ref} />
        <div className="">
          {/* <div
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
          </div> */}

          <div className="flex-center gap-8 mt-3">
            <button
              style={{ backgroundColor: toolName === "" ? "black" : "white" }}
              className="p-1 border border-black custom-shadow rounded-[8px] h-9 w-9"
              onClick={handleReset}
            >
              <img src={restartIon} alt="rest" className="h-7 w-7" />
            </button>
            <button
              style={{
                backgroundColor: toolName === "zoom" ? "black" : "white",
              }}
              className="p-1 border border-black custom-shadow rounded-[8px] h-9 w-9"
              onClick={setZoomActive}
            >
              <img src={zoomIcon} alt="rest" className="h-7 w-7" />
            </button>
            <button
              style={{
                backgroundColor: toolName === "wwc" ? "black" : "white",
              }}
              className="p-1 border border-black custom-shadow rounded-[8px] h-9 w-9"
              onClick={setWwwcActive}
            >
              <img src={dropIcon} alt="rest" className="h-7 w-7" />
            </button>
            <button
              style={{
                backgroundColor: toolName === "stackscroll" ? "black" : "white",
              }}
              className="p-1 border border-black custom-shadow rounded-[8px] h-9 w-9"
              onClick={setScrollActive}
            >
              <img src={gameIcon} alt="rest" className="flex h-7 w-7" />
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
