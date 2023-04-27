import React, { useState } from "react";
import { CmtTable } from "../components";

import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";
import { CmtForm } from "../components";

const Customizes = () => {
  const { screenSize } = useStateContext();
  const [currTab, setCurrTab] = useState(0);

  const inactiveTab =
    "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  const activeTab =
    "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";

  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <div className="flex w-full justify-center">
        <ul className="w-10/12 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              onClick={() => setCurrTab(0)}
              className={currTab === 0 ? activeTab : inactiveTab}
            >
              My dictionary
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setCurrTab(1)}
              className={currTab === 1 ? activeTab : inactiveTab}
            >
              Create
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        {currTab === 0 && <CmtTable />}
        {currTab === 1 && <CmtForm />}
      </div>

      <Footer />
    </div>
  );
};

export default Customizes;
