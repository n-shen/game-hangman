import React, { useEffect } from "react";

import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

// import axios from "axios";

const Home = () => {
  const { shared_info, screenSize } = useStateContext();
  // const baseURL = shared_info.baseURL;

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <div className="mt-5 flex w-full justify-center">
        <p className="text-xl w-10/12">hangman game play center</p>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
