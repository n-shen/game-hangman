import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";

import axios from "axios";

const Game = () => {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

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
  };

  useEffect(() => {
    console.log("dictionary", dictionary);
  }, [dictionary]);

  return (
    <div className="mt-5 flex w-full justify-center">
      {!gameSession && (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Let's play Hangman!
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
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
      {gameSession && <div>{dictionary}</div>}
    </div>
  );
};

export default Game;
