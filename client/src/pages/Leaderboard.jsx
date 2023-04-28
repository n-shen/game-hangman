import React from "react";

import { LeaderBoard } from "../components";
import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

const Leaderboard = () => {
  const { screenSize } = useStateContext();

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          LEADERBOARD
        </h1>
      </div>
      <LeaderBoard />
      <Footer />
    </div>
  );
};

export default Leaderboard;
