import React from "react";

const RankingModal = ({ transformedScore,setPlayerName, showModal, playerName, handleEnter, saveScore, setShowModal }) => {
  return (
  <div className={`fixed z-10 inset-0 bg-black bg-opacity-60 overflow-hidden ${showModal ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-xl w-[90%] md:w-1/2 lg:w-1/3 space-y-4">
          <h2 className="text-xl font-medium text-center text-black">
            You scored {transformedScore} points!
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
              className="w-full bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Cancel
            </button>
            <button
              onClick={saveScore}
              className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;
