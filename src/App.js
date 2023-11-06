import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import VerticalLayout from "./components/VerticalLayout";
import CreateProject from "./pages/CreateProject";
import TabsPage from "./pages/TabsPage";
import PersonPage from "./pages/PersonPage";
import IsAuthenticated from "./components/IsAuthenticated";
import CreateSubject from "./components/models/CreateSubject";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useDcomImage } from "./hooks/useDcomImage";
import { ToastContainer } from "react-toastify";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CreateSubject isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
      <Routes>
        <Route element={<IsAuthenticated isLoggedIn={isLoggedIn} />}>
          <Route element={<VerticalLayout setIsOpen={setIsOpen} />}>
            <Route path="/" element={<CreateProject />} />
            <Route path="/tabs-page" element={<TabsPage />} />
            <Route
              path="/person/:id"
              onUpdate={() => window.scrollTo(0, 0)}
              element={<PersonPage />}
            />
            {/* <Route path="/person/" element={<PersonPage />} /> */}
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
