import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import VerticalLayout from "./components/VerticalLayout";
import CreateProject from "./pages/CreateProject";
import TabsPage from "./pages/TabsPage";
import PersonPage from "./pages/PersonPage";
import IsAuthenticated from "./components/IsAuthenticated";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

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

        <Route
          path="/sign-in"
          element={<SignIn handleSignIn={handleSignIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
