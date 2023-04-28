import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import "tailwindcss/tailwind.css";
import "./GameBoard.css";

import axios from "axios";

const GameBoard = ({ word }) => {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  const [roundTime, setRoundTime] = useState(0);
  const words = ["react", "javascript", "programming", "frontend", "backend"];
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const gameOver = guessesLeft === 0;
  const isWinner = selectedWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    setAnswer(selectedWord);
    if (guessesLeft === 0 || isWinner) {
      setIsGameOver(true);
    }
  }, [guessesLeft, isWinner, selectedWord]);

  const updateUserRecord = (d) => {
    axios
      .post(`${baseURL}/game/dictionary`, {
        difficulty: 0,
      })
      .then((response) => {
        if (response.data["success"]) {
        }
        console.log(response.data);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toLowerCase();
      if (/[a-z]/.test(letter) && !guessedLetters.includes(letter)) {
        handleGuess(letter);
      }
    };
    if (!isGameOver) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedLetters, isGameOver]);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setGuessesLeft(guessesLeft - 1);
      }
    }
  };

  const keyboardLetters = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((letter) => (
      <button
        key={letter}
        className={`bg-sky-500/100 text-white font-bold py-2 px-4 rounded-lg mr-2 mb-2 ${
          guessedLetters.includes(letter) ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={gameOver || isWinner || guessedLetters.includes(letter)}
        onClick={() => handleGuess(letter)}
      >
        {letter}
      </button>
    ));

  const wordLetters = selectedWord
    .split("")
    .map((letter) => (
      <span className="mx-2 mb-2 text-2xl">
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ));

  const statusMessage = isWinner
    ? "You win!"
    : gameOver
    ? "You lose!"
    : `Guesses left: ${guessesLeft}`;

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setGuessesLeft(6);
    if (isWinner) {
      setScore(score + 10);
    }
    setAnswer("");
    setIsGameOver(false);
  };

  const titleLetters = "HANGMAN".split("").map((letter, index) => (
    <div
      key={index}
      className={`w-12 h-12 text-white rounded-full font-bold flex items-center justify-center mr-2 ${
        index === 0
          ? "bg-green-500"
          : index === 1
          ? "bg-pink-500"
          : index === 2
          ? "bg-purple-500"
          : index === 3
          ? "bg-blue-500"
          : index === 4
          ? "bg-green-500"
          : index === 5
          ? "bg-red-500"
          : "bg-pink-500"
      }`}
    >
      {letter}
    </div>
  ));

  // const playAgain = () => {
  //   setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  //   setGuessedLetters([]);
  //   setGuessesLeft(6);

  // }

  return (
    <div className="mt-5 flex w-full justify-center border-2 border-sky-500/100">
      {/* {word && <div>{word}</div>} */}

      <div className="min-h-screen flex flex-col items-center justify-center mt-4 mb-4">
        <div className="bg-blue-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-0 mb-12 hover:bg-gray-200 transition-colors duration-300">
          Score: {isWinner ? score + 10 : score}
        </div>
        <div className="title flex justify-center items-start mt-0">
          {titleLetters}
        </div>
        <div className="flex flex-wrap mt-10">{wordLetters}</div>
        {gameOver && (
          <p className="text-xl font-bold mb-8">
            The word was: <span className="text-green-500">{answer}</span>
          </p>
        )}
        <div className="flex flex-wrap pl-4 items-center justify-center">
          {keyboardLetters}
        </div>
        <p
          className={`text-xl md:text-2xl font-bold mt-8 ${
            isWinner
              ? "text-green-500"
              : gameOver
              ? "text-red-500"
              : "text-black-400"
          }`}
        >
          {statusMessage}
        </p>
        {(isWinner || gameOver) && (
          <div className="flex flex-col items-center justify-center mt-3">
            <button
              className="bg-blue-500 text-white text-gray-800 font-bold py-2 px-4 rounded-lg mt-2 hover:bg-gray-200 transition-colors duration-300"
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
