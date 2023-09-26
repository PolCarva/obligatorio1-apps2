import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
            <h1 className="text-5xl font-extrabold mb-8 tracking-tight shadow-text">Trivia Challenge!</h1>
            <Link to="/question">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    ¡Start Playing!
                </button>
            </Link>
        </div>
    );
}

export default HomePage;
