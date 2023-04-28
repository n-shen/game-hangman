import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { motion } from "framer-motion";
import avatar from "../assets/avatars/panda.png";
import "tailwindcss/tailwind.css";
import "./GameBoard.css";

const GameBoard = () => {
  const {
    currWord,
    newRound,
    setNewRound,
    setCurrWinner,
    screenSize,
    activeMenu,
  } = useStateContext();
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(7);
  const [answer, setAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [move, setMove] = useState(false);
  const [position, setPosition] = useState(0);
  const [manTop, setManTop] = useState(0);
  const [manRight, setManRight] = useState(0);

  useEffect(() => {
    let manRect = document.getElementById("man").getBoundingClientRect();
    setManTop(manRect.top);
    setManRight(activeMenu ? manRect.right - 296 : manRect.right - 40);
    // console.log(manRect.top, manRect.right);
  }, [screenSize, activeMenu]);

  useEffect(() => {
    setMove(true);
    switch (guessesLeft) {
      case 7:
        setPosition(0);
        break;
      case 6:
        setPosition(manTop / 3.0);
        break;
      case 5:
        setPosition((manTop * 2) / 3.0);
        break;
      case 4:
        setPosition(manTop);
        break;
      case 2:
        setPosition((manTop * 2) / 3.0);
        break;
      case 1:
        setPosition(manTop / 3.0);
        break;
      case 0:
        setPosition(0);
        break;
      default:
    }
  }, [guessesLeft]);

  const gameOver = guessesLeft === 0;
  const isWinner = currWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    setAnswer(currWord);
    if (guessesLeft === 0 || isWinner) {
      if (isWinner) setCurrWinner(true);
      setIsGameOver(true);
    }
  }, [guessesLeft, isWinner, currWord]);

  useEffect(() => {
    setGuessedLetters([]);
    setGuessesLeft(7);
    setNewRound(false);
    setIsGameOver(false);
  }, [newRound, setNewRound]);

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
      if (!currWord.includes(letter)) {
        setGuessesLeft(guessesLeft - 1);
      }
    }
  };

  const keyboard_top = "qwertyuiop".split("").map((letter) => (
    <button
      key={letter}
      className={`w-2 h-6 md:w-10 md:h-10 bg-sky-500/100 text-white md:font-bold font-light pb-1 md:py-1 md:px-2 pr-4 pl-2 rounded md:rounded-lg mr-1 mb-1 md:mb-2 ${
        guessedLetters.includes(letter) ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={gameOver || isWinner || guessedLetters.includes(letter)}
      onClick={() => handleGuess(letter)}
    >
      {letter}
    </button>
  ));

  const keyboard_mid = "asdfghjkl".split("").map((letter) => (
    <button
      key={letter}
      className={`w-2 h-6 md:w-10 md:h-10 bg-sky-500/100 text-white md:font-bold font-light pb-1 md:py-1 md:px-2 pr-4 pl-2 rounded md:rounded-lg mr-1 mb-1 md:mb-2 ${
        guessedLetters.includes(letter) ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={gameOver || isWinner || guessedLetters.includes(letter)}
      onClick={() => handleGuess(letter)}
    >
      {letter}
    </button>
  ));

  const keyboard_btm = "zxcvbnm".split("").map((letter) => (
    <button
      key={letter}
      className={`w-2 h-6 md:w-10 md:h-10 bg-sky-500/100 text-white md:font-bold font-light pb-1 md:py-1 md:px-2 pr-4 pl-2 rounded md:rounded-lg mr-1 mb-1 md:mb-2 ${
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
    <div className="mt-5 flex w-full justify-center">
      <div className="flex flex-col items-center justify-center mt-4 mb-4">
        <div className="w-full">
          <motion.div
            className="ring"
            style={{
              height: manTop + 50,
              right: manRight,
              top: -manTop - 40,
              background: guessesLeft > 3 ? "black" : "red",
              width: guessesLeft > 3 ? "5px" : "8px",
            }}
            animate={{ y: move ? position : 0 }}
          />
          <motion.div
            className="man2"
            style={{
              top: -manTop + 200,
              right: manRight - 50,
              background: "red",
              border: "2px",
              visibility: guessesLeft > 3 ? "hidden" : "visible",
            }}
            animate={{ y: move ? position : 0 }}
          >
            <img
              style={{
                height: 100,
                width: 100,
                visibility: guessesLeft > 3 ? "hidden" : "visible",
              }}
              src={avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
          </motion.div>
        </div>

        <img
          id="man"
          style={{
            height: 100,
            width: 100,
            visibility: guessesLeft <= 3 ? "hidden" : "visible",
          }}
          src={avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
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
        {gameOver && (
          <p className="text-xl font-bold">
            The word was: <span className="text-green-500">{answer}</span>
          </p>
        )}
        <div className="flex flex-wrap mt-10">{wordLetters}</div>
        <div className="items-center justify-center px-2 py-2 border-2 border-sky-500/100 rounded-lg">
          <div className="">{keyboard_top}</div>
          <div className="pl-5">{keyboard_mid}</div>
          <div className="pl-9">{keyboard_btm}</div>
        </div>
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
