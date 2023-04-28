import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { GameBoard } from "./index";

import axios from "axios";

const Game = () => {
  const {
    shared_info,
    currWord,
    setCurrWord,
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
  } = useStateContext();
  const baseURL = shared_info.baseURL;

  const { user } = useAuthContext();

  const [dictionary, setDictionary] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("animals");
  const [gameSession, setGameSession] = useState(false);

  const fetchDictionary = (difficulty, category) => {
    axios
      .post(`${baseURL}/game/dictionary`, {
        difficulty: difficulty,
        category: category,
      })
      .then((response) => {
        if (response.data["success"]) {
          setDictionary([...response.data["dictionary"]]);
          setGameSession(true);
        }
        console.log(response.data);
      });

    if (user) {
      axios
        .post(`${baseURL}/profile/get`, {
          uid: user.user_id,
        })
        .then((response) => {
          if (response.data["success"]) {
            setCurrScore(response.data["profile"]["score"]);
            setCurrEasy(response.data["profile"]["rounds_easy"]);
          }
          console.log("latest profile:", response.data);
        });
    }
  };

  const updateUserRecord = () => {
    axios
      .post(`${baseURL}/profile/update`, {
        uid: user.user_id,
        score: currScore,
        easy: currEasy,
        normal: currNormal,
        hard: currHard,
      })
      .then((response) => {
        if (response.data["success"]) {
        }
        console.log(response.data);
      });
  };

  useEffect(() => {
    console.log("dictionary", dictionary);
    if (dictionary)
      setCurrWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
  }, [dictionary]);

  useEffect(() => {
    console.log(currWord);
  }, [currWord]);

  useEffect(() => {
    console.log("win?:", currWinner);
    if (currWinner) {
      if (difficulty === "easy") {
        setCurrScore(currScore + 5);
        setCurrEasy(currEasy + 1);
      } else if (difficulty === "normal") {
        setCurrScore(currScore + 10);
        setCurrNormal(currNormal + 1);
      } else {
        setCurrScore(currScore + 20);
        setCurrHard(currHard + 1);
      }
    }
  }, [currWinner]);

  useEffect(() => {
    if (currWinner && user) {
      updateUserRecord();
      console.log("updating user score:", currScore);
      setCurrWinner(false);
    }
  }, [currScore]);

  return (
    <div className="mt-5 w-full justify-center">
      {!gameSession && (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Let's play Hangman!
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
              You should be able to select difficulty level and category later
              at this page.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => fetchDictionary(difficulty, category)}
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
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>
      )}

      {/*TODO: loop repeat random word from dictionary*/}
      {gameSession && currScore && (
        <div className="justify-center w-full flex">Score: {currScore}</div>
      )}
      {gameSession && currWord && <GameBoard word={currWord} />}
      {gameSession && currWord && (
        <div>
          <button
            className="bg-blue-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-2 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => {
              setCurrWord(
                dictionary[Math.floor(Math.random() * dictionary.length)]
              );
              setNewRound(true);
              setCurrWinner(false);
            }}
          >
            New Round
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
