import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";

export const useCornerstoneSynchronization = async (images) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      console.error("Element not found.");
      return;
    }

    // Enable the Cornerstone element
    cornerstone.enable(element);

    const imageIds = images.map((imagePath) => `wadouri:${imagePath}`);

    const loadImages = async () => {
      try {
        const images = await Promise.all(
          imageIds.map((imageId) => cornerstone.loadAndCacheImage(imageId))
        );

        const stack = {
          currentImageIdIndex: 0,
          imageIds: imageIds,
        };

        cornerstone.displayImage(element, images[0]);

        cornerstoneTools.addStackStateManager(element, ["stack", "Crosshairs"]);
        cornerstoneTools.addToolState(element, "stack", stack);

        // Add and activate tools without synchronization context
        cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);
        cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool);

        // Event listener for zoom events
        element.addEventListener("cornerstonezoom", (event) => {
          const { viewport } = event.detail;
          const elements = document.querySelectorAll(".cornerstone-canvas");

          elements.forEach((el) => {
            if (el !== element) {
              const eventData = cornerstone.getEnabledElement(el);
              eventData.viewport.scale = viewport.scale;
              cornerstone.setViewport(el, eventData.viewport);
            }
          });
        });

        // Set up zoom event handler
        element.addEventListener("cornerstonenewimage", (event) => {
          const eventData = event.detail;
          cornerstoneTools.addToolState(element, "stack", eventData);
          const viewport = cornerstone.getViewport(element);
          element.dispatchEvent(
            new CustomEvent("cornerstonezoom", { detail: { viewport } })
          );
        });
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImages();

    return () => {
      // Cleanup logic if needed
    };
  }, [images]);

  return elementRef;
};
