import React, { useEffect, useState } from "react";
import UploadFiles from "../UploadFiles";
import uploadImg from "../../assets/uploadimg.svg";
import uploadDoc from "../../assets/uploaddoc.svg";
import { useAddPojectFilesMutation } from "../../store/services/folderUpload";
import { useDispatch } from "react-redux";
import { addFolders } from "../../store/slice/foldersSlice";

const Data = () => {
  const dispatch = useDispatch();
  const [createPlatform, { isLoading, isSuccess, isError, error, data }] =
    useAddPojectFilesMutation();

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files[0];
    createPlatform(selectedFiles);

    //  setFiles(Array.from(selectedFiles));
  };
  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(addFolders(data));
    }
  }, [isSuccess]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isSuccess) {
    return <h1>Uploaded</h1>;
  }

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
