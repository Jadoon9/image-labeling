import React from "react";
import imageUplaod from "../assets/uploadimg.svg";
import UploadFiles from "./UploadFiles";
import restartIon from "../assets/mdi_restart.svg";
import zoomIcon from "../assets/tabler_zoom-in-filled.svg";
import dropIcon from "../assets/mdi_water-opacity.svg";
import gameIcon from "../assets/game-icons_level-four.svg";
import DwvImage from "./DWVImage";

const CategoryCard = ({ title, typ, image2, hideTitle, images }) => {
  console.log(images, "99898");
  return (
    <div className="w-full custom-shadow p-5 rounded-[22px]">
      {!hideTitle && <h3 className="h3-bold">Category 1</h3>}
      {!hideTitle && <p className="body-light mt-2">Type 1</p>}

      <div className="flex flex-col overflow-scroll custom-scrollbar gap-10 h-[250px] ">
        <DwvImage dicomImage={images[0]} />
        {/* {images.map((img, idx) => (
          <DwvImage image={img} />

        
        ))} */}
        {/* <UploadFiles img={imageUplaod} /> */}
        {/* {image2 && <UploadFiles img={imageUplaod} />} */}
      </div>

      {/* <div className="flex-center gap-10 mt-4">
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
      </div> */}
    </div>
  );
};

export default CategoryCard;
