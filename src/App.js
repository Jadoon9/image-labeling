import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import VerticalLayout from "./components/VerticalLayout";
import CreateProject from "./pages/CreateProject";
import TabsPage from "./pages/TabsPage";
import PersonPage from "./pages/PersonPage";
import IsAuthenticated from "./components/IsAuthenticated";

import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route element={<IsAuthenticated isLoggedIn={isLoggedIn} />}>
          <Route element={<VerticalLayout />}>
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
