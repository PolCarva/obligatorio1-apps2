import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <h1 className="text-5xl text-center font-extrabold mb-8 tracking-tight shadow-text">
        Oops! 404
      </h1>
      <p className="mb-5 text-xl">
        The page you're looking for can't be found.
      </p>
      <div className="w-full flex flex-col gap-y-5 items-center">
        <Link
          to="/"
          className="w-full md:w-1/3 lg:w-1/4 flex justify-center"
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 w-full lg:text-md rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
