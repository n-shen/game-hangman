import React from "react";
import { useSearchParams } from "react-router-dom";

import { Game, ShareGame } from "../components";
import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

const Home = () => {
  const { screenSize } = useStateContext();
  const [queryParameters] = useSearchParams();
  const sid = queryParameters.get("share");

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      {!sid && <Game />}
      {sid && <ShareGame sid={sid} />}
      <Footer />
    </div>
  );
};

export default Home;
