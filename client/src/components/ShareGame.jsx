import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
import { GameBoard } from "./index";

import axios from "axios";

const ShareGame = () => {
  const { sid } = useParams();
  const { shared_info, currWord, setCurrWord, setNewRound, setCurrWinner } =
    useStateContext();
  const baseURL = shared_info.baseURL;

  const [sharingProfile, setSharingProfile] = useState(null);
  const [dictionary, setDictionary] = useState([]);
  const [gameSession, setGameSession] = useState(false);
  const [currIdx, setCurrIdx] = useState(0);
  const [dictionaryLength, setDictionaryLength] = useState(0);

  useEffect(() => {
    axios
      .post(`${baseURL}/game/sharingdictionary`, {
        sid: sid,
      })
      .then((response) => {
        if (response.data["success"]) {
          setSharingProfile(response.data["dictionary"]);
        }
      });
  }, []);

  useEffect(() => {
    if (sharingProfile) setDictionary([...sharingProfile["words"]]);
  }, [sharingProfile]);

  useEffect(() => {
    console.log("dictionary", dictionary);
    if (dictionary) {
      setCurrWord(dictionary[0]);
      setDictionaryLength(dictionary.length);
    }
  }, [dictionary]);

  return (
    <div>
      <div className="mt-5 flex w-full justify-center">
        {!gameSession && sharingProfile && dictionary && (
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {sharingProfile["fk_user"]} invited you to play customized
                Hangman: {sharingProfile["title"]}!
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                {sharingProfile["description"]}
                {!sharingProfile["description"] &&
                  "The host did not set a description for this game."}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setGameSession(true)}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Get started
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <NavLink
                  to="/"
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Exit
                </NavLink>
              </div>
            </div>
          </section>
        )}
        {gameSession && currWord && (
          <div className="justify-center w-10/12">
            <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
              Progress
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
                style={{
                  width: `${((currIdx + 1) * 100) / dictionaryLength}%`,
                }}
              ></div>
            </div>
            <GameBoard />
          </div>
        )}
      </div>
      {gameSession && dictionary && currIdx < dictionaryLength && (
        <div className="mt-5 flex w-full justify-center">
          <button
            className="bg-blue-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-2 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => {
              if (currIdx < dictionaryLength - 1) {
                setCurrIdx(currIdx + 1);
                setCurrWord(dictionary[currIdx + 1]);
                setNewRound(true);
                setCurrWinner(false);
              } else {
                setCurrIdx(0);
                setCurrWord(dictionary[0]);
                setNewRound(false);
                setCurrWinner(false);
                setGameSession(false);
              }
            }}
          >
            {currIdx < dictionaryLength - 1 ? "Next" : "Done"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareGame;
