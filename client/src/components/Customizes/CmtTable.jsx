import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { useStateContext } from "../../contexts/StateContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { useCustomizesContext } from "../../hooks/useCustomizesContext";

import axios from "axios";

const CmtTable = () => {
  const { user } = useAuthContext();
  const { cloud_ctms, dispatch } = useCustomizesContext();

  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  useEffect(() => {
    if (user) {
      axios
        .post(`${baseURL}/ctm/get`, {
          customizeUser: user.user,
        })
        .then((response) => {
          if (response.data["success"]) {
            dispatch({ type: "SET_CTMS", payload: response.data["ctms"] });
          }
          console.log(response.data);
        });
    }
  }, [user, dispatch, baseURL]);

  const handleDelete = (ele) => {
    console.log("delete", ele);
    axios
      .post(
        `${baseURL}/ctm/destroy`,
        {
          cid: ele._id,
          fk_user: user.user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data["success"])
          dispatch({ type: "DELETE_CTMS", payload: response.data["ctm"] });
      });
  };

  return (
    <div className="flex w-full justify-center">
      {user && cloud_ctms && (
        <div className="w-10/12 relative overflow-x-auto">
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
              {cloud_ctms &&
                cloud_ctms.map((val, index) => {
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
                      <td className="px-6 py-4">{val.words.join(" | ")}</td>
                      <td className="px-6 py-4">{val.description}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(val)}
                          className="text-red-700"
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </td>
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
