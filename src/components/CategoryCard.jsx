import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";

const synchronizer = new cornerstoneTools.Synchronizer(
  "cornerstonenewimage",
  cornerstoneTools.updateImageSynchronizer
);

const CategoryCard = ({ images }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const loadImages = async () => {
      const element = elementRef.current;

      if (!element) {
        console.error("Element not found.");
        return;
      }

      // Enable the Cornerstone element
      cornerstone.enable(element);

      const imageIds = images.map((imagePath) => `wadouri:${imagePath}`);

      try {
        const images = await Promise.all(
          imageIds.map((imageId) => cornerstone.loadAndCacheImage(imageId))
        );

        const stack = {
          currentImageIdIndex: 0,
          imageIds: imageIds,
        };

        cornerstone.displayImage(element, images[0]);

        synchronizer.add(element);
        cornerstoneTools.addStackStateManager(element, ["stack", "Crosshairs"]);
        cornerstoneTools.addToolState(element, "stack", stack);

        // Add and activate tools with synchronization context
        cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);

        cornerstoneTools.setToolActive("StackScroll", {
          mouseButtonMask: 1,
          synchronizationContext: synchronizer,
        });

        cornerstoneTools.setToolActive("StackScrollMouseWheel", {
          synchronizationContext: synchronizer,
        });

        cornerstoneTools.setToolActive("Zoom", {
          mouseButtonMask: 1,
          synchronizationContext: synchronizer,
        });

        cornerstoneTools.setToolActive("ZoomMouseWheel", {
          synchronizationContext: synchronizer,
        });

        cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool, {
          synchronizationContext: synchronizer,
        });
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImages();
  }, [images]);

  return <div ref={elementRef} style={{ height: "400px", width: "100%" }} />;
};

export default CategoryCard;
