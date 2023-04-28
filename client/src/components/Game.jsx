import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { GameBoard } from "./index";
import { titleLetters } from "./GameBoard";

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
  const [difficultyIdx, setDifficultyIdx] = useState(0);
  const [category, setCategory] = useState("animals");
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [gameSession, setGameSession] = useState(false);

  const difficulty_hm = {
    0: "easy",
    1: "normal",
    2: "hard",
  };

  const category_hm = {
    0: "animals",
    1: "fruits",
    2: "plants",
    3: "sports",
    4: "countries",
    5: "random",
  };

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
          setCurrScore(0);
        }
        console.log(response.data);
      });

    if (user) {
      axios
        .post(
          `${baseURL}/profile/get`,
          {
            uid: user.user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data["success"]) {
            setCurrScore(response.data["profile"]["score"]);
            setCurrEasy(response.data["profile"]["rounds_easy"]);
            setCurrNormal(response.data["profile"]["rounds_normal"]);
            setCurrHard(response.data["profile"]["rounds_hard"]);
          }
          console.log("latest profile:", response.data);
        });
    }
  };

  const updateUserRecord = () => {
    axios
      .post(
        `${baseURL}/profile/update`,
        {
          uid: user.user_id,
          score: currScore,
          easy: currEasy,
          normal: currNormal,
          hard: currHard,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data["success"]) {
          setCurrWinner(false);
        }
        console.log(response.data);
      });
  };

  useEffect(() => {
    console.log("dictionary", dictionary);
    if (dictionary)
      setCurrWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
  }, [dictionary, setCurrWord]);

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
      } else if (difficulty === "hard") {
        setCurrScore(currScore + 20);
        setCurrHard(currHard + 1);
      }
    }
  }, [currWinner]);

  useEffect(() => {
    if (currWinner) {
      if (user) updateUserRecord();
      console.log("updating user score:", currScore);
      setCurrWinner(false);
    }
  }, [currScore]);

  return (
    <div className="mt-5 justify-center">
      {!gameSession && (
        <div className="w-full justify-center">
          <div className="flex ml-5">
            <button
              onClick={() => {
                if (difficultyIdx + 1 < 3) {
                  setDifficulty(difficulty_hm[difficultyIdx + 1]);
                  setDifficultyIdx(difficultyIdx + 1);
                } else {
                  setDifficultyIdx(0);
                  setDifficulty(difficulty_hm[0]);
                }
              }}
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {difficulty_hm[difficultyIdx]}
            </button>

            <button
              onClick={() => {
                if (categoryIdx + 1 < 6) {
                  setCategory(category_hm[categoryIdx + 1]);
                  setCategoryIdx(categoryIdx + 1);
                } else {
                  setCategoryIdx(0);
                  setCategory(category_hm[0]);
                }
              }}
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {category_hm[categoryIdx]}
            </button>
          </div>
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
        </div>
      )}

      {gameSession && currWord && (
        <div className="w-full justify-center">
          <div className="title flex justify-center items-start mt-0">
            {titleLetters}
          </div>

          <div className="hidden lg:block title flex justify-center items-start mt-0">
            <div className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600  dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                {category}
              </span>
            </div>
            <div className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                {difficulty}
              </span>
            </div>
            <div className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                Score {currScore}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5 flex w-full justify-center">
        {gameSession && currWord && (
          <div className="w-10/12">
            <GameBoard word={currWord} />
          </div>
        )}
      </div>

      {gameSession && currWord && (
        <div className="mt-5 flex w-full justify-center">
          <button
            className="bg-gray-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-2 hover:bg-red-400 transition-colors duration-300"
            onClick={() => {
              setGameSession(false);
              setNewRound(false);
              setCurrWinner(false);
            }}
          >
            Exit
          </button>

          <button
            className="ml-5 bg-indigo-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition-colors duration-300"
            onClick={() => {
              setCurrWord(
                dictionary[Math.floor(Math.random() * dictionary.length)]
              );
              setNewRound(true);
              setCurrWinner(false);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
