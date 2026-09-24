import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Landing Page */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* Login Page */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* Dashboard / Post Composer */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;