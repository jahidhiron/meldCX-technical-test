import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Landing from "./pages/Landing";
import GlobalStyle from "./styles/Global.styles";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PrivateOutlet from "./components/PrivateOutlet";

// root component
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <GlobalStyle />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Landing />}
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Join />}
        />

        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
