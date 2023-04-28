import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import "tailwindcss/tailwind.css";
import "./GameBoard.css";

const GameBoard = () => {
  const { currWord, newRound, setNewRound, setCurrWinner } = useStateContext();

  const [roundTime, setRoundTime] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);

  const gameOver = guessesLeft === 0;
  const isWinner = currWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    if (isWinner) setCurrWinner(true);
  }, [isWinner]);

  useEffect(() => {
    setGuessedLetters([]);
    setGuessesLeft(6);
    setNewRound(false);
  }, [newRound, setNewRound]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toLowerCase();
      if (/[a-z]/.test(letter) && !guessedLetters.includes(letter)) {
        handleGuess(letter);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedLetters]);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!currWord.includes(letter)) {
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

  const wordLetters = currWord.split("").map((letter, index) => (
    <span key={index} className="mx-2 mb-2 text-2xl">
      {guessedLetters.includes(letter) ? letter : "_"}
    </span>
  ));

  const statusMessage = isWinner
    ? "You win!"
    : gameOver
    ? "You lose!"
    : `Guesses left: ${guessesLeft}`;

  return (
    <div className="mt-5 flex w-full justify-center border-2 border-sky-500/100">
      <div className="flex flex-col items-center justify-center mt-4 mb-4">
        <div className="flex flex-wrap mb-8 mt-10">{wordLetters}</div>
        <div className="flex flex-wrap pl-4">{keyboardLetters}</div>
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
      </div>
    </div>
  );
};
export const titleLetters = "HANGMAN".split("").map((letter, index) => (
  <div
    key={index}
    className={`lg:w-12 lg:h-12 xs:h-10 text-white rounded-full font-bold flex items-center justify-center mr-2 ${
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

export default GameBoard;
