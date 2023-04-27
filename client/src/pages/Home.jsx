import React from "react";
import { Game } from "../components";

import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

const Home = () => {
  const { screenSize } = useStateContext();

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <Game />
      <Footer />
    </div>
  );
};

export default Home;
