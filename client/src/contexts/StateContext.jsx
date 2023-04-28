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
  const [currWord, setCurrWord] = useState(undefined);
  const [currScore, setCurrScore] = useState(0);
  const [currEasy, setCurrEasy] = useState(0);
  const [currNormal, setCurrNormal] = useState(0);
  const [currHard, setCurrHard] = useState(0);
  const [currWinner, setCurrWinner] = useState(false);
  const [newRound, setNewRound] = useState(false);

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
        currWord,
        setCurrWord,
        newRound,
        setNewRound,
        currScore,
        setCurrScore,
        currWinner,
        setCurrWinner,
        currEasy,
        setCurrEasy,
        currNormal,
        setCurrNormal,
        currHard,
        setCurrHard,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
