import React, { useEffect, useState } from "react";
import UploadFiles from "../UploadFiles";
import uploadImg from "../../assets/uploadimg.svg";
import uploadDoc from "../../assets/uploaddoc.svg";
import { useAddPojectFilesMutation } from "../../store/services/folderUpload";
import { useDispatch } from "react-redux";
import { addFolders } from "../../store/slice/foldersSlice";
import { toast } from "react-toastify";
import { useGetFromDbQuery } from "../../store/services/projectService";
import Loader from "../Loader";
import { setIsUploading, setSelectedTab } from "../../store/slice/layoutSlice";

const Data = () => {
  const dispatch = useDispatch();
  const [getDbData, setGetDbData] = useState(false);
  const [createPlatform, { isLoading, isSuccess, isError, error, data }] =
    useAddPojectFilesMutation();

  const {
    isLoading: dbIsLoading,
    isSuccess: dbIsSuccess,
    isError: dbIsError,
    error: dbError,
    data: dbData,
    refetch: refetchDb,
  } = useGetFromDbQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: !getDbData,
  });

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files[0];
    createPlatform(selectedFiles);
  };

  const handleReadLocal = () => {
    setGetDbData(true);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addFolders(data));
      toast.success("Successfully Upoaded from Local");
      dispatch(setSelectedTab("Taxonomy"));
    }
    if (dbIsSuccess && getDbData) {
      dispatch(addFolders(dbData));
      toast.success("Successfully Upoaded from Db");
      dispatch(setSelectedTab("Taxonomy"));
    }
    if (isError || dbIsError) {
      toast.error("Something went Wrong");
    }
  }, [isSuccess, isError, dbIsSuccess, getDbData]);

  useEffect(() => {
    dispatch(setIsUploading(isLoading));
  }, [isLoading]);

  if (isLoading || dbIsLoading) {
    return <Loader />;
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
          <div
            className="w-40 h-40  cursor-pointer flex flex-col items-center justify-center p-2 rounded "
            onClick={handleReadLocal}
          >
            <img src={uploadImg} alt="img" className="w-40 h-40" />
            <h3 className=" h3-regular max-w-[100px] text-center mt-10 ">
              Read From Local
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
