import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Sidebar } from "./components";
import {
  Customizes,
  Home,
  Login,
  Register,
  Setting,
  Leaderboard,
} from "./pages";

import { useStateContext } from "./contexts/StateContext";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

function App() {
  const { activeMenu } = useStateContext();
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-64" : " flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/customize"
                  element={user ? <Customizes /> : <Login />}
                ></Route>
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Home />}
                ></Route>{" "}
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Home />}
                ></Route>
                <Route path="/setting" element={<Setting />}></Route>
                <Route path="/share/:sid" element={<Home />}></Route>
                <Route path="/rank" element={<Leaderboard />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
