import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import { ActivitiesContextProvider } from "./context/activities/context";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { AppContextProvider } from "./context/AppContext";
import Login from "./pages/login/Login";
import Activity from "./pages/activity/Activity";
import Partner from "./pages/partner/Partner";
import NotFound from "./pages/NotFound/NotFound";
import AddActivity from "./pages/activity/AddActivity";
import Activities from "./pages/activity/Activities";
function App() {
  const { mode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={`App ${mode === "true" ? "dark" : ""}`}>
      <AppContextProvider>
        <ActivitiesContextProvider>
          <Routes>
            <Route
              path="/"
              element={!user ? <Navigate to="/login" /> : <Home />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/partners"
              element={!user ? <Navigate to="/login" /> : <Partner />}
            />
            <Route
              path="/activities"
              element={!user ? <Navigate to="/login" /> : <Activities />}
            />
            <Route
              path="/activities/addActivity"
              element={!user ? <Navigate to="/login" /> : <AddActivity />}
            />
            <Route
              path="/activities/:id"
              element={!user ? <Navigate to="/login" /> : <Activity />}
            />
            <Route
              path="*"
              element={!user ? <Navigate to="/login" /> : <NotFound />}
            />
          </Routes>
        </ActivitiesContextProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;
