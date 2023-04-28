import { useState, useEffect } from "react";

import { useStateContext } from "../contexts/StateContext";
import axios from "axios";

function LeaderBoard() {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;
  const avatars = [
    "/avatars/panda.png",
    "/avatars/hacker.png",
    "/avatars/girl.png",
    "/avatars/man.png",
    "/avatars/girl2.png",
  ];

  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/game/rank`).then((response) => {
      if (response.data["success"]) {
        setRank([...response.data["rank"]]);
      }
      console.log(response.data);
    });
  }, [setRank, baseURL]);

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center">
      <div className="w-10/12 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse justify-center table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left bg-blue-400">
              <th className="py-3 px-4 uppercase font-bold text-center text-sm text-white tracking-wider">
                #
              </th>
              <th className="py-3 px-4 uppercase text-justify text-center pl-11 font-bold text-sm text-white tracking-wider">
                Player
              </th>
              <th className="py-3 px-4 uppercase font-bold text-center text-sm text-white tracking-wider">
                Score
              </th>
              <th className="py-3 px-4 uppercase font-bold text-center text-sm text-white tracking-wider">
                Easy
              </th>
              <th className="py-3 px-4 uppercase font-bold text-center text-sm text-white tracking-wider">
                Normal
              </th>
              <th className="py-3 px-4 uppercase font-bold text-center text-sm text-white tracking-wider">
                Hard
              </th>
            </tr>
          </thead>
          <tbody>
            {rank ? (
              rank.map((player, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="py-4 px-4 font-bold">{index + 1}</td>
                  <td className="py-4 px-4 flex items-center">
                    <img
                      src={avatars[0]}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <span>{player.user_name}</span>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-green-500">
                    {player.score}
                  </td>
                  <td className="py-4 px-4 text-center text-black-500">
                    {player.rounds_easy}
                  </td>
                  <td className="py-4 px-4 text-center text-black-500">
                    {player.rounds_normal}
                  </td>
                  <td className="py-4 px-4 text-center text-black-500">
                    {player.rounds_hard}
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
