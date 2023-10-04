// SettingsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RouletteIcon from "../components/RouletteIcon";
import { FaRandom } from "react-icons/fa";
import Roulette from "../components/Roulette";
import categories from "../data/categories";

const SettingsPage = (props) => {
  const { setDifficulty, setCategoryId, setQuestionAmount } = props;
  const [showRoulette, setShowRoulette] = useState(false);

  const [currentDifficulty, setCurrentDifficulty] = useState("medium");
  const [currentQuestionAmount, setCurrentQuestionAmount] = useState("10");
  const [currentCategory, setCurrentCategory] = useState("9");

  useEffect(() => {
    const storedDifficulty = localStorage.getItem("difficulty");
    const storedQuestionAmount = localStorage.getItem("questionAmount");
    const storedCategory = localStorage.getItem("category");

    if (storedCategory) setCurrentCategory(storedCategory);
    if (storedDifficulty) setCurrentDifficulty(storedDifficulty);
    if (storedQuestionAmount) setCurrentQuestionAmount(storedQuestionAmount);
  }, []);

  const handleDifficultyChange = (value) => {
    setCurrentDifficulty(value);
    setDifficulty(value);
    localStorage.setItem("difficulty", value);
  };

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
    setCategoryId(value);
    localStorage.setItem("category", value);
  };

  const handleQuestionAmountChange = (value) => {
    setCurrentQuestionAmount(value);
    setQuestionAmount(value);
    localStorage.setItem("questionAmount", value);
  };

  const randomizeSettings = () => {
    const difficulties = ["easy", "medium", "hard"];
    const amounts = ["5", "10", "15", "20", "25"];

    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)].id;

    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    setCurrentDifficulty(randomDifficulty);
    setCurrentCategory(randomCategory);
    setCurrentQuestionAmount(randomAmount);

    setDifficulty(randomDifficulty);
    setCategoryId(randomCategory);
    setQuestionAmount(randomAmount);

    localStorage.setItem("difficulty", randomDifficulty);
    localStorage.setItem("category", randomCategory);
    localStorage.setItem("questionAmount", randomAmount);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      {showRoulette && (
        <Roulette
          closeModal={() => setShowRoulette(false)}
          onCategorySelected={handleCategoryChange}
        />
      )}
      <h1 className="text-3xl text-center font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gr gap-5 w-full md:w-1/2 lg:w-2/5 justify-center">
        <div className="flex flex-col">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={currentDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="h-12 md:h-10 p-2 bg-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 border border-gray-300"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount">Amount of Questions</label>

          <select
            id="amount"
            value={currentQuestionAmount}
            onChange={(e) => handleQuestionAmountChange(e.target.value)}
            className="p-2 h-12 md:h-10 bg-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 border border-gray-300"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 h-12 md:h-10 bg-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 border border-gray-300"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.display}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 items-end">
          <button
            onClick={() => setShowRoulette(true)}
            className=" custom-multicolor-gradient flex  group hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center  w-1/2 h-12 md:h-10 shadow-lg rounded"
          >
            <RouletteIcon
              className={
                "h-12 md:h-8 drop-shadow-lg group-hover:scale-125 ease-in-out duration-300 transition-all"
              }
            />
          </button>
          <button
            onClick={randomizeSettings}
            className="flex group hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center bg-green-500 w-1/2 h-12 md:h-10 shadow-lg rounded"
          >
            <FaRandom
              className={
                "h-7 w-7 fill-white group-hover:scale-125 ease-in-out duration-300 transition-all"
              }
            />
          </button>
        </div>
      </div>

      <Link to="/" className="mt-8 w-full md:w-1/3 lg:w-1/4">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default SettingsPage;
