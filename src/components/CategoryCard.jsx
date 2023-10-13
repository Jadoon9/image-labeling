import React from "react";
import imageUplaod from "../assets/uploadimg.svg";
import UploadFiles from "./UploadFiles";
import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";

const CategoryCard = ({ title, typ, image2, hideTitle }) => {
  return (
    <div className="w-full custom-shadow p-5 rounded-[22px]">
      {!hideTitle && <h3 className="h3-bold">Category 1</h3>}
      {!hideTitle && <p className="body-light mt-2">Type 1</p>}
      <div className="flex-center gap-10 ">
        <UploadFiles img={imageUplaod} />
        {image2 && <UploadFiles img={imageUplaod} />}
      </div>

      <div className="flex-center gap-10 mt-4">
        <div className="p-1 custom-shadow rounded-[8px]">
          <img src={restartIon} alt="rest" className="h-7 w-7" />
        </div>
        <div className="p-1 custom-shadow rounded-[8px]">
          <img src={zoomIcon} alt="rest" className="h-7 w-7" />
        </div>
        <div className="p-1 custom-shadow rounded-[8px]">
          <img src={dropIcon} alt="rest" className="h-7 w-7" />
        </div>
        <div className="p-1 custom-shadow rounded-[8px]">
          <img src={gameIcon} alt="rest" className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
