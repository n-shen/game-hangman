import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const shared_info = {
  baseURL: "http://localhost:8080/api/v1",
  baseURLSharing: "http://localhost:3000/share/",
};

export const StateContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [userProfile, setUserProfile] = useState(undefined);

  return (
    <StateContext.Provider
      value={{
        shared_info,
        userProfile,
        setUserProfile,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
