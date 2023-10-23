import { Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // const dcom = useDcomImage()

  return (
    <div>
      <CreateSubject isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
      <Routes>
        <Route element={<IsAuthenticated isLoggedIn={isLoggedIn} />}>
          <Route element={<VerticalLayout setIsOpen={setIsOpen} />}>
            <Route path="/" element={<CreateProject />} />
            <Route path="/tabs-page" element={<TabsPage />} />
            <Route path="/person" element={<PersonPage />} />
          </Route>
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
