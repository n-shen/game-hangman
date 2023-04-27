import React from "react";
import { CmtTable } from "../components";

import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";

const Customizes = () => {
  const { screenSize } = useStateContext();

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <CmtTable />
      <Footer />
    </div>
  );
};

export default Customizes;
