import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";

const HomePage = (props) => {
  const { categoryId, questionAmount, difficulty } = props;

  function getCategoryName(id) {
    const index = categories.findIndex((category) => category.id === id);
    if (index === -1) {
      return "Unknown";
    }
    return categories[index].display;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <h1 className="text-5xl text-center font-extrabold mb-8 tracking-tight shadow-text">
        Trivia Challenge!
      </h1>
      <p className="mb-5">
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
        <Link
          to="/settings"
          className="w-full md:w-1/3 lg:w-1/4 flex justify-center"
        >
          <button className="bg-gray-500 text-white hover:bg-[#5d5d5d] hover:text-gray-100 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
