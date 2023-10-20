import React from "react";

import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";
import DwvImage from "./DWVImage";

const CategoryCard = ({
  hideTitle,
  cat,
  type,
  handleFileChange,
  setZoomActive,
  setMouseWheelActive,
  handleFullscreenToggle,
  setWwwcActive,
  handleReset,
  imageIds,
}) => {
  return (
    <div className="w-full custom-shadow p-5 rounded-[22px]">
      {!hideTitle && <h3 className="h3-bold">Category {cat}</h3>}
      {!hideTitle && <p className="body-light mt-2">Type {type}</p>}

      <div className="flex flex-col overflow-scroll custom-scrollbar gap-10 h-[250px] ">
        <div>
          <input type="file" onChange={handleFileChange} multiple />
          <button onClick={setZoomActive}>Zoom/Pan</button>
          <button onClick={setMouseWheelActive} style={{ marginLeft: "10px" }}>
            Scroll
          </button>
          <button
            onClick={handleFullscreenToggle}
            style={{ marginLeft: "10px" }}
          >
            Length
          </button>
          <button onClick={setWwwcActive} style={{ marginLeft: "10px" }}>
            WWWC
          </button>
          <button onClick={handleReset} style={{ marginLeft: "10px" }}>
            Eraser
          </button>

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
        {/* {images.map((img, idx) => (
          <DwvImage image={img} />

        
        ))} */}
        {/* <UploadFiles img={imageUplaod} /> */}
        {/* {image2 && <UploadFiles img={imageUplaod} />} */}
      </div>

      <div className="flex-center gap-10 mt-4">
        <button className="p-1 custom-shadow rounded-[8px] h-8 w-8 ">
          <img src={restartIon} alt="rest" className="h-7 w-7" />
        </button>
        <button className="p-1 custom-shadow rounded-[8px] h-8 w-8">
          <img src={zoomIcon} alt="rest" className="h-7 w-7" />
        </button>
        <button className="p-1 custom-shadow rounded-[8px] h-8 w-8">
          <img src={dropIcon} alt="rest" className="h-7 w-7" />
        </button>
        <button className="p-1 custom-shadow rounded-[8px] h-8 w-8">
          <img src={gameIcon} alt="rest" className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
