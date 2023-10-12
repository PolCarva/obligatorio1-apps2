import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import { VscDebugRestart } from "react-icons/vsc";

import RankingTable from "../components/RankingTable";
import RankingModal from "../components/RankingModal";

const RankingPage = (props) => {
  const { score, timeOutMode } = props;

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

      <h1 className="text-4xl font-bold mt-20">Ranking</h1>
      <RankingModal
        transformedScore={transformedScore}
        showModal={showModal}
        playerName={playerName}
        handleEnter={handleEnter}
        saveScore={saveScore}
        setShowModal={setShowModal}
        setPlayerName={setPlayerName}
      />

      <RankingTable rankings={rankings} />

      <Link to="/" className="absolute left-2">
        <button className="bg-yellow-400 flex gap-2 items-center hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          <FiArrowLeft />
          Back Home
        </button>
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
