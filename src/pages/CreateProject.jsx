import React from "react";
import creatImage from "../assets/createproject.svg";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedTab } from "../store/slice/layoutSlice";

const CreateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(setSelectedTab("Data"));
    navigate("/tabs-page");
  };

  return (
    <div className="flex flex-col  justify-center items-center min-h-screen">
      <img src={creatImage} alt="creeate" className="h-[350px] w-[500px]" />
      <div className="w-60 mt-10">
        <Button btnText="Create a new project" onClick={handleCreate} />
      </div>
    </div>
  );
};

export default CreateProject;
