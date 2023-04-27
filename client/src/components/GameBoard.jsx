import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import 'tailwindcss/tailwind.css';


import axios from "axios";

const GameBoard = ({ word }) => {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  const [roundTime, setRoundTime] = useState(0);
  const words = ['react', 'javascript', 'programming', 'frontend', 'backend'];
  const [selectedWord, setSelectedWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);

  const gameOver = guessesLeft === 0;
  const isWinner = selectedWord.split('').every((letter) => guessedLetters.includes(letter));


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

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setGuessesLeft(guessesLeft - 1);
      }
    }
  };

  const keyboardLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
    <button
      key={letter}
      className="border-2 border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded mx-1"
      disabled={gameOver || isWinner || guessedLetters.includes(letter)}
      onClick={() => handleGuess(letter)}
    >
      {letter}
    </button>
  ));

  const wordLetters = selectedWord.split('').map((letter) => (
    <span className="mx-1">
      {guessedLetters.includes(letter) ? letter : '_'}
    </span>
  ));

  const statusMessage = isWinner ? 'You win!' : gameOver ? 'You lose!' : `Guesses left: ${guessesLeft}`;

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setGuessesLeft(6);
  }


  return (
    <div className="mt-5 flex w-full justify-center border-4 border-indigo-500">
      {/* {word && <div>{word}</div>} */}
      <div>
        <h1 className="text-3xl text-center font-bold mb-4">HANGMAN</h1>
        <div className="text-center mb-4">
          {wordLetters}
        </div>
        <div className="mb-4 text-center mt-4">
          {keyboardLetters}
        </div>
        <p className="text-lg font-bold">{statusMessage}</p>
        {isWinner || gameOver && (
          <button
            className="border-2 border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded mt-4"
            onClick={restartGame}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;


