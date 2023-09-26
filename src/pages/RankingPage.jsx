import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RankingPage = (props) => {
  const { score } = props;
  const [rankings, setRankings] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const savedRankings = JSON.parse(localStorage.getItem("rankings") || "[]");
    setRankings(savedRankings);
  }, []);

  const saveScore = () => {
    const savedRankings = JSON.parse(localStorage.getItem("rankings") || "[]");
    savedRankings.push({ name: playerName, score: score });
    savedRankings.sort((a, b) => b.score - a.score);
    localStorage.setItem("rankings", JSON.stringify(savedRankings));
    setRankings(savedRankings);
    setShowModal(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      saveScore();
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br gap-y-5 from-blue-600 to-purple-700 text-white p-5">
      <h1 className="text-4xl font-bold">Ranking</h1>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-xl w-1/3 space-y-4">
              <h2 className="text-xl font-medium text-center text-black">
                Score: {score}
              </h2>
              <h2 className="text-xl font-medium text-gray-900">
                Enter your name
              </h2>
              <input
                placeholder="Name"
                autoFocus
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
                className="border p-2 w-full rounded text-gray-900"
              />
              <div className="w-full flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveScore}
                  className="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  Guardar Puntuación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="w-3/4 bg-white text-black rounded-lg shadow-lg border-collapse overflow-hidden">
        <thead>
          <tr>
            <th className="w-8 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.length === 0 ? (
            <tr>
              <td className="px-4 border py-2">#</td>
              <td className="px-4 border py-2">Empty</td>
              <td className="px-4 border py-2">Empty</td>
            </tr>
          ) : (
            rankings.map((rank, index) => (
              <tr key={index} className={index % 2 !== 0 ? "bg-gray-50" : ""}>
                <td
                  className={`px-4 py-2 border-b border-r ${
                    index === 0 && "bg-yellow-500 font-bold"
                  } ${index === 1 && "bg-slate-300 font-bold"} ${
                    index === 2 && "bg-orange-800 font-bold"
                  }`}
                >
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-r">{rank.name}</td>
                <td className="px-4 py-2 border-b">{rank.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link to="/" className="absolute top-2 left-2 hover:text-slate-200 transition-colors">Back to home</Link>
      <button
        className="absolute bottom-2 left-2 hover:text-slate-200 transition-colors"
        onClick={() => {
          setRankings([]);
          localStorage.setItem("rankings", JSON.stringify([]));
        }}
      >
        Reset Ranking
      </button>
    </div>
  );
};

export default RankingPage;
