import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import VerticalLayout from "./components/VerticalLayout";
import CreateProject from "./pages/CreateProject";
import TabsPage from "./pages/TabsPage";
import PersonPage from "./pages/PersonPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<VerticalLayout />}>
          <Route path="/" element={<CreateProject />} />
          <Route path="/tabs-page" element={<TabsPage />} />
          <Route path="/person" element={<PersonPage />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
