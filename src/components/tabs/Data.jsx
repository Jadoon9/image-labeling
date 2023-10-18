import React from "react";
import UploadFiles from "../UploadFiles";
import uploadImg from "../../assets/uploadimg.svg";
import uploadDoc from "../../assets/uploaddoc.svg";

const Data = () => {
  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;

    console.log(selectedFiles, "selectedFiles");
    //  setFiles(Array.from(selectedFiles));
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex-center flex-wrap gap-10">
        <div className="flex-center h-[320px] w-[300px] bg-[#F5F5F5] rounded-[16px]">
          <UploadFiles
            img={uploadImg}
            text1="Upload Data (Inactive)"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex-center h-[320px] w-[300px] bg-[#F5F5F5] rounded-[16px]">
          <UploadFiles
            img={uploadDoc}
            text1="Read From Local"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Data;
