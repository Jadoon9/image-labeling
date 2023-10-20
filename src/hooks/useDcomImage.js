import { useEffect, useRef } from "react";
import dwv from "dwv";

const useDcomImage = (imageUrl) => {
  const dwvContainerRef = useRef(null);
  useEffect(() => {
    // Initialize DWV
    const viewer = new dwv.Viewer({
      containerDivId: "dwv-container",
      tools: ["Scroll"],
    });
    viewer.init();

    // Load DICOM image
    viewer.loadURLs([imageUrl]);
  }, [imageUrl]);

  return <div ref={dwvContainerRef} id="dwv-container"></div>;
};

export { useDcomImage };
