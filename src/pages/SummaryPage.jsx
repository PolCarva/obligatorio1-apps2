import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import triviaEnd from "../assets/music/trivia-end.mp3";

const endTriviaAudio = new Audio(triviaEnd);

const SummaryPage = (props) => {
  const { correctAnswers, totalQuestions, resetGame, score, timeOutMode } =
    props;

    useEffect(() => {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.pause();
      }
      endTriviaAudio.play();


    }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
      <h1 className="text-4xl font-bold">Summary</h1>
      <p className="text-2xl">{`Correct answers: ${correctAnswers}`}</p>
      <p className="text-2xl">{`Incorrect answers: ${
        totalQuestions - correctAnswers
      }`}</p>

      <p className="text-2xl relative">
        {`Total points: ${timeOutMode ? score * 2 : score}`}
        {timeOutMode && (
          <span className="font-extrabold absolute -top-4 -right-10 rotate-[30deg] text-yellow-400">
            x2
          </span>
        )}
      </p>
      <Link to="/">
        <button
          onClick={resetGame}
          className="bg-yellow-400 text-gray-900 font-bold py-2 px-5 m-2 w-52 rounded-md hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Play Again
        </button>
      </Link>
      <Link to="/ranking">
        <button className="bg-green-400 text-gray-900 font-bold py-2 px-5 m-2 w-52 rounded-md hover:bg-green-500 transition duration-300 ease-in-out">
          Ranking
        </button>
      </Link>
    </div>
  );
};

export default SummaryPage;
