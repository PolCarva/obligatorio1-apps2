import React from "react";
import { Link } from "react-router-dom";

const SummaryPage = (props) => {
  const { correctAnswers, totalQuestions, resetGame } = props;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
      <h1 className="text-4xl font-bold">Resumen</h1>
      <p className="text-2xl">{`Respondiste correctamente a ${correctAnswers} de ${totalQuestions} preguntas.`}</p>
      <Link to="/">
        <button 
          onClick={resetGame}
          className="bg-yellow-400 text-gray-900 font-bold py-2 px-5 m-2 w-52 rounded-md hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Jugar de nuevo
        </button>
      </Link>
      <Link to="/ranking">
        <button 
          className="bg-green-400 text-gray-900 font-bold py-2 px-5 m-2 w-52 rounded-md hover:bg-green-500 transition duration-300 ease-in-out"
        >
          Ver Ranking
        </button>
      </Link>
    </div>
  );
};

export default SummaryPage;
