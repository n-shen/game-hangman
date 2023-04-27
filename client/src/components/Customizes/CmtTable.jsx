import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import axios from "axios";

const CmtTable = () => {
  const { user } = useAuthContext();
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;
  const [customizes, setCustomizes] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .post(`${baseURL}/ctm/get`, {
          customizeUser: user.user,
        })
        .then((response) => {
          if (response.data["success"]) {
            setCustomizes([...response.data["ctms"]]);
          }
          console.log(response.data);
        });
    }
  }, [user, baseURL]);

  return (
    <div className="flex w-full justify-center">
      {user && (
        <div className="w-10/12 relative overflow-x-auto">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Create my own dictionary
          </button>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Dictionary
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {customizes &&
                customizes.map((val, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{val.title}</td>
                      <td className="px-6 py-4">{val.words}</td>
                      <td className="px-6 py-4">{val.description}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CmtTable;
