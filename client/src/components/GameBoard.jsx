import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";

import axios from "axios";

const GameBoard = ({ word }) => {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  const [roundTime, setRoundTime] = useState(0);

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

  return (
    <div className="mt-5 flex w-full justify-center border-4 border-indigo-500">
      {word && <div>{word}</div>}
    </div>
  );
};

export default GameBoard;
