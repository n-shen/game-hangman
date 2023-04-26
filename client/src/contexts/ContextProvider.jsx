import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const shared_info = {
  baseURL: "http://localhost/api/v1",
};

export const ContextProvider = ({ children }) => {
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
