import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

import { VscDebugRestart } from "react-icons/vsc";

const RankingPage = (props) => {
  const { score, resetGame, timeOutMode } = props;

  const transformedScore = timeOutMode ? score * 2 : score;

  const [confetti, setConfetti] = useState(false);

  const [rankings, setRankings] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const savedRankings = JSON.parse(localStorage.getItem("rankings") || "[]");
    setRankings(savedRankings);
  }, []);

  const saveScore = () => {
    if (playerName === "") return toast.error("Please enter your name");

    const savedRankings = JSON.parse(localStorage.getItem("rankings") || "[]");
    savedRankings.push({ name: playerName, score: transformedScore });
    savedRankings.sort((a, b) => b.score - a.score);
    localStorage.setItem("rankings", JSON.stringify(savedRankings));
    setRankings(savedRankings);

    const playerRanking =
      savedRankings.findIndex(
        (r) => r.name === playerName && r.score === transformedScore
      ) + 1;

    toast.success(`Your ranking is ${playerRanking}!`);
    setShowModal(false);
    setConfetti(true);

    // Para el confeti
    setTimeout(() => setConfetti(false), 5000);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      saveScore();
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br gap-y-5 from-blue-600 to-purple-700 text-white p-5">
      {confetti && <Confetti className="disappear" />}

      <h1 className="text-4xl font-bold">Ranking</h1>
      {showModal && score > 0 && (
        <div className="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-xl w-[90%] md:w-1/2 lg:w-1/3 space-y-4">
              <h2 className="text-xl font-medium text-center text-black">
                Score: {transformedScore}
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
              <div className="w-full flex justify-between gap-y-4 flex-wrap">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-red-500  hover:bg-red-600 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveScore}
                  className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
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
              <td colSpan="3" className="px-4 text-center border py-2">
                No one ranked yet, Be the first!
              </td>
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
      <Link
        to="/"
        className="absolute top-2 left-2 hover:text-slate-200 transition-colors"
        onClick={resetGame}
      >
        Back to home
      </Link>
      <button
        className="absolute group flex items-center gap-1 bottom-2 left-2 hover:text-slate-200 transition-colors"
        onClick={() => {
          setRankings([]);
          localStorage.setItem("rankings", JSON.stringify([]));
        }}
      >
        <VscDebugRestart className="group-hover:-rotate-[360deg] transition-transform ease-in-out duration-500" />
        Reset Ranking
      </button>
    </div>
  );
};

export default RankingPage;
