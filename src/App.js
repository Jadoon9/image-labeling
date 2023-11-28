import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import VerticalLayout from "./components/VerticalLayout";
import CreateProject from "./pages/CreateProject";
import TabsPage from "./pages/TabsPage";
import PersonPage from "./pages/PersonPage";
import IsAuthenticated from "./components/IsAuthenticated";
import CreateSubject from "./components/models/CreateSubject";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDcomImage } from "./hooks/useDcomImage";
import { ToastContainer } from "react-toastify";
import * as cornerstone3D from "@cornerstonejs/core";
import * as cornerstoneTools3D from "@cornerstonejs/tools";
import DeleteProject from "./components/models/DeleteProject";
import { closeModal, deleteProject } from "./store/slice/projectSlice";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { openModel } = useSelector((state) => state.project);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    cornerstone3D.init({ gpuTier: { tier: 0 } });
    cornerstoneTools3D.init();
    cornerstoneTools3D.addTool(cornerstoneTools3D?.ZoomTool);
    cornerstoneTools3D.addTool(cornerstoneTools3D.WindowLevelTool);
    cornerstoneTools3D.addTool(cornerstoneTools3D.PanTool);
    cornerstoneTools3D.addTool(cornerstoneTools3D.StackScrollMouseWheelTool);
  }, []);

  useEffect(() => {
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter
    const id = searchParams.get("id");

    // Now you can use the 'id' in your component
    console.log("IDfromparams:", id);
  }, []);

  // const handleDeleteModal = () => {
  //   dispatch(deleteProject(null));
  // };
  return (
    <div>
      <CreateSubject isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
      <DeleteProject
        isOpen={isOpenDeleteModel}
        handleOpen={() => setIsOpenDeleteModel(!isOpenDeleteModel)}
        setIsOpenDeleteModel={setIsOpenDeleteModel}
      />
      <Routes>
        <Route element={<IsAuthenticated isLoggedIn={isLoggedIn} />}>
          <Route
            element={
              <VerticalLayout
                setIsOpen={setIsOpen}
                setIsOpenDeleteModel={setIsOpenDeleteModel}
              />
            }
          >
            <Route path="/" element={<CreateProject />} />
            <Route path="/tabs-page" element={<TabsPage />} />
            <Route path="/person/:id" element={<PersonPage />} />
          </Route>
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <ToastContainer
        style={{ fontSize: "16px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
