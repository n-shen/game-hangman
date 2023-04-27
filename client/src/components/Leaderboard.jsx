import { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [players, setPlayers] = useState(
    [
        {'id': 1, 'name': 'Player 1', 'score': 10},
        {'id': 2, 'name': 'Player 2', 'score': 20},
        {'id': 3, 'name': 'Player 3', 'score': 30},
        {'id': 4, 'name': 'Player 4', 'score': 40},
        {'id': 5, 'name': 'Player 5', 'score': 50},
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
                  <th className="py-3 px-4 uppercase font-bold text-sm text-white tracking-wider">Name</th>
                  <th className="py-3 px-4 uppercase font-bold text-sm text-white tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                    <td className="py-4 px-4 font-bold">{index + 1}</td>
                    <td className="py-4 px-4">{player.name}</td>
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
