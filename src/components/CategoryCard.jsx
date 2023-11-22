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
  synced,
  index,
  setSyncedToolName,
  currentCaseIndex,
}) => {
  const toolGroupId = "myToolGroup" + idx;
  const syncedToolGroupId =
    idx % 2 === 0 ? `myToolGroup${idx - 1}` : `myToolGroup${idx + 1}`;
  const viewportId = "CT_AXIAL_STACK" + idx;
  const renderingEngineId = "myRenderingEngine" + idx;
  let currentVoi;
  const [, forceUpdate] = useState();
  const baseUrl = "http://127.0.0.1:8000/";
  const scheme = "wadouri";
  console.log(currentCaseIndex, "currentCaseIndex");

  const [toolName, setToolName] = useState("");

  const elementRef = useRef(null);

  useEffect(() => {
    if (!synced || idx % 2 === 1) return;

    const toolGroup = cornerstoneTools3D.ToolGroupManager.getToolGroup(
      "myToolGroup" + (idx - 1)
    );
    if (toolGroup) {
      const isActivePan = toolGroup.toolOptions.Pan.mode === "Active";
      const isActiveZoom = toolGroup.toolOptions.Zoom.mode === "Active";
      const isActiveStackScroll =
        toolGroup.toolOptions.StackScrollMouseWheel.mode === "Active";
      const isActiveWwc = toolGroup.toolOptions.WindowLevel.mode === "Active";
      if (isActivePan) {
        if (isActiveZoom) {
          setZoomActive();
        } else {
          handleReset();
        }
      }
      if (isActiveStackScroll) setScrollActive();
      if (isActiveWwc) setWwwcActive();
    }
  }, [synced]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        if (
          cornerstone3D.getRenderingEngine(renderingEngineId) &&
          !images?.length
        ) {
          return;
        }

        const imageIds = await Promise?.all(
          images?.map?.(async (imagePath) => {
            const imageId = `${scheme}:${baseUrl}${imagePath?.image}`;
            return imageId;
          })
        );

        // const content = document.getElementById(idx);

        // const element = document.createElement("div");
        // element.oncontextmenu = (e) => e.preventDefault();
        // element.style.width = "100%";
        // element.style.height = "270px";
        // content.appendChild(element);

        // let element;
        // if (myContent) {
        //   element = document.createElement("div");
        //   element.oncontextmenu = (e) => e.preventDefault();
        //   element.style.width = "100%";
        //   element.style.height = "270px";
        //   myContent.appendChild(element);
        //   setRenderElement(element);
        // } else {
        //   console.log(`Element with ID ${idx} not found.`);
        // }

        let element = elementRef.current;
        if (!element) return;
        const renderingEngine = new RenderingEngine(renderingEngineId);

        const viewportInput = {
          viewportId,
          element,
          type: ViewportType.STACK,
        };

        renderingEngine?.enableElement(viewportInput);
        const viewport = renderingEngine?.getViewport(viewportId);

        viewport.setUseCPURendering(true);

        if (viewport && element && imageIds.length) {
          // Set the stack if there are images
          viewport.setStack(imageIds, Math.floor(imageIds.length / 2));
        }
        // if (imageIds.length === 0) {
        //   // Render "No Images Found" message
        //   element.innerHTML =
        //     '<div class="flex justify-center items-center h-[270px]"><p class="body-bold">No Images Found</p></div>';
        // } else if (viewport && element && imageIds.length) {
        //   // Set the stack if there are images
        //   viewport.setStack(imageIds, Math.floor(imageIds.length / 2));
        // }

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
          toolGroup.setToolPassive(
            cornerstoneTools3D.StackScrollMouseWheelTool.toolName
          );
          toolGroup.setToolPassive(cornerstoneTools3D.WindowLevelTool.toolName);
          toolGroup.setToolPassive(cornerstoneTools3D.ZoomTool.toolName);
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
      } catch (error) {
        console.log(error, "checkerror");
      }
    };

    loadImages();
  }, [id, currentCaseIndex, idx, renderingEngineId]);

  const handleSetSyncedName = (id, name) => {
    setSyncedToolName((prevSyncedToolName) => {
      const updatedSyncedName = { ...prevSyncedToolName };

      // Add or update the name for the current ID
      updatedSyncedName[`id${id}`] = name;

      // Determine the adjacent ID based on whether id is even or odd
      const adjacentId = id % 2 === 0 ? id - 1 : id + 1;

      // Add or update the name for the adjacent ID
      updatedSyncedName[`id${adjacentId}`] = name;

      return updatedSyncedName;
    });
  };

  const handleDisabledAllTools = () => {
    const renderingEngine = cornerstone3D.getRenderingEngine(renderingEngineId);
    const viewport = renderingEngine.getViewport(viewportId);
    currentVoi = viewport.voiRange;
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    const syncedToolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(syncedToolGroupId);
    const toolGroups = synced ? [toolGroup, syncedToolGroup] : [toolGroup];
    if (toolGroup) {
      toolGroups.map((toolGroup) => {
        toolGroup.setToolPassive(cornerstoneTools3D.ZoomTool.toolName);
        toolGroup.setToolPassive(cornerstoneTools3D.PanTool.toolName);
        toolGroup.setToolPassive(
          cornerstoneTools3D.StackScrollMouseWheelTool.toolName
        );
        toolGroup.setToolPassive(cornerstoneTools3D.WindowLevelTool.toolName);
      });
    }
  };

  const handleReset = () => {
    if (synced) handleSetSyncedName("");
    else setToolName("");
    const renderingEngine = cornerstone3D.getRenderingEngine(renderingEngineId);
    const viewport = renderingEngine.getViewport(viewportId);
    viewport?.resetCamera(true, true);
    viewport?.setImageIdIndex(0);
    viewport?.setVOI(currentVoi, {});
    handleDisabledAllTools();

    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    const syncedToolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(syncedToolGroupId);
    const toolGroups = synced ? [toolGroup, syncedToolGroup] : [toolGroup];
    toolGroups.map((toolGroup) => {
      toolGroup.setToolActive(cornerstoneTools3D.PanTool.toolName, {
        bindings: [
          {
            mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
          },
        ],
      });
    });
  };

  const setZoomActive = (e) => {
    if (synced) handleSetSyncedName("zoom");
    else setToolName("zoom");
    handleDisabledAllTools();
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    toolGroup.setToolDisabled(cornerstoneTools3D.WindowLevelTool.toolName);
    toolGroup.setToolDisabled(
      cornerstoneTools3D.StackScrollMouseWheelTool.toolName
    );
    toolGroup.setToolDisabled(cornerstoneTools3D.PanTool.toolName);
    toolGroup.setToolActive(cornerstoneTools3D.ZoomTool.toolName, {
      bindings: [
        {
          mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
        },
      ],
    });
  };

  const setWwwcActive = (e) => {
    if (synced) handleSetSyncedName("wwc");
    else setToolName("wwc");
    handleDisabledAllTools();
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    const syncedToolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(syncedToolGroupId);
    const toolGroups = synced ? [toolGroup, syncedToolGroup] : [toolGroup];
    toolGroups.map((toolGroup) => {
      toolGroup.setToolActive(cornerstoneTools3D.WindowLevelTool.toolName, {
        bindings: [
          {
            mouseButton: cornerstoneTools3D.Enums.MouseBindings.Primary,
          },
        ],
      });
    });
  };

  const setScrollActive = () => {
    if (synced) handleSetSyncedName("stackscroll");
    else setToolName("stackscroll");
    handleDisabledAllTools();
    const toolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(toolGroupId);
    const syncedToolGroup =
      cornerstoneTools3D.ToolGroupManager.getToolGroup(syncedToolGroupId);
    const toolGroups = synced ? [toolGroup, syncedToolGroup] : [toolGroup];
    toolGroups.map((toolGroup) => {
      toolGroup.setToolPassive(cornerstoneTools3D.ZoomTool.toolName);
      toolGroup.setToolPassive(cornerstoneTools3D.PanTool.toolName);
      toolGroup.setToolPassive(cornerstoneTools3D.WindowLevelTool.toolName);
      toolGroup.setToolActive(
        cornerstoneTools3D.StackScrollMouseWheelTool.toolName
      );
    });
  };

  return (
    <>
      <div className="w-full custom-shadow  p-1 rounded-[22px] min-h-[300px] flex flex-col justify-between">
        <div className="px-4 pt-4">
          {!hideTitle && <h3 className="h3-bold">Category : {cat}</h3>}
          {!hideTitle && <p className="body-light mt-2">Type : {type}</p>}
        </div>

        <div className="w-full">
          <div id={idx} className="w-full" />
        </div>
        <div className="">
          <div
            onContextMenu={() => false}
            unselectable="on"
            className="overflow-hidden"
          >
            <div
              className="overflow-hidden relative w-full h-[270px]"
              ref={elementRef}
            >
              {!images?.length && (
                <div className="z-50 absolute top-0 bg-white left-0 right-0 bottom-0 flex justify-center items-center">
                  <p className="body-bold">No Images Found</p>
                </div>
              )}
            </div>
          </div>

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
                onClick={() => handleValueChange(index, optIdx)}
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
