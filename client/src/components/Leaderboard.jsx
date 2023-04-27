import { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [players, setPlayers] = useState(
    [
        {'id': 1, 'user_name': 'Player 1', 'score': 10, 'image': '/avatars/panda.png'},
        {'id': 2, 'user_name': 'Player 2', 'score': 20, 'image': '/avatars/hacker.png'},
        {'id': 3, 'user_name': 'Player 3', 'score': 30, 'image': '/avatars/girl.png'},
        {'id': 4, 'user_name': 'Player 4', 'score': 40, 'image': '/avatars/man.png'},
        {'id': 5, 'user_name': 'Player 5', 'score': 50, 'image': '/avatars/girl2.png'},
    ]);

    useEffect(() => {
          const sortedPlayers = players.sort((a, b) => b.score - a.score);
          setPlayers(sortedPlayers);
    }, []);

    return (
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">LEADERBOARD</h1>
          <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr className="text-left bg-blue-400">
                  <th className="py-3 px-4 uppercase font-bold text-sm text-white tracking-wider">#</th>
                  <th className="py-3 px-4 uppercase text-justify pl-11 font-bold text-sm text-white tracking-wider">Player</th>
                  <th className="py-3 px-4 uppercase font-bold text-sm text-white tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                    <td className="py-4 px-4 font-bold">{index + 1}</td>
                    <td className="py-4 px-4 flex items-center">
                      <img src={player.image} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                      <span>{player.user_name}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-green-500">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default Leaderboard;
