import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";

const HomePage = (props) => {
  const {
    categoryId,
    questionAmount,
    difficulty,
    toggleTimeOut,
    timeOutMode,
    resetGame,
  } = props;
  function getCategoryName(id) {
    const index = categories.findIndex((category) => category.id == id);
    if (index === -1) {
      return "Unknown";
    }
    return categories[index].display;
  }
  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="absolute top-5 right-5 flex gap-5 items-center">
        <span className="font-bold">Time Out Mode</span>
        <input
          defaultChecked={timeOutMode}
          onClick={toggleTimeOut}
          type="checkbox"
          id="hs-basic-usage"
          className="relative flex items-center w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-yellow-400 rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-yellow-400 focus:ring-yellow-400 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-yellow-400 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-yellow-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-yellow-200"
        />
        <label for="hs-basic-usage" class="sr-only">
          switch
        </label>
      </div>
      <h1 className="text-5xl text-center font-extrabold mb-8 tracking-tight shadow-text">
        Trivia Challenge!
      </h1>
      <p className="mb-5 text-center">
        <span className="font-bold">{questionAmount}</span> questions about{" "}
        <span className="font-bold">{getCategoryName(categoryId)}</span>,
        difficulty: <span className="font-bold">{difficulty}</span>
      </p>
      <div className="w-full flex flex-col gap-y-5 items-center">
        <Link
          to="/question"
          className="w-full md:w-1/3 lg:w-1/4 flex justify-center"
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Start Playing
          </button>
        </Link>
        <div className="flex flex-col md:flex-row w-full gap-5 md:w-1/3 lg:w-1/4">
          <Link
            to="/ranking"
            className="w-full flex justify-center"
          >
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Ranking
            </button>
          </Link>
          <Link
            to="/settings"
            className="w-full flex justify-center"
          >
            <button className="bg-gray-500 text-white hover:bg-[#5d5d5d] hover:text-gray-100 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
