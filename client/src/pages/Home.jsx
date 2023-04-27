import React from "react";
import { useParams } from "react-router-dom";

import { Game, ShareGame } from "../components";
import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

const Home = () => {
  const { screenSize } = useStateContext();
  const { sid } = useParams();

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      {!sid && <Game />}
      {sid && <ShareGame />}
      <Footer />
    </div>
  );
};

export default Home;
