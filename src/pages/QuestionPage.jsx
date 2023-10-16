import React, { useEffect, useRef, useState } from "react";
import CountdownCircle from "../components/CountdownCircle";
import backgroundMusic from "../assets/music/quiz-background-music.mp3";

const QuestionPage = (props) => {
  const { questions, currentQuestion, selectAnswer, timeOutMode } = props;
  const questionData = questions[currentQuestion];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [countdown, setCountdown] = useState(5);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.play();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (questionData) {
      const options = [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
    }
    //Cuando cambia la pregunta resetea el timer
    setCountdown(5);
  }, [questionData]);

  useEffect(() => {
    if (timeOutMode) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Limpiar el intervalo al desmontar o cambiar de pregunta
      return () => clearInterval(interval);
    }
  }, [questionData]);

  useEffect(() => {
    if (timeOutMode && countdown === 0) {
      handleOptionClick(null); // Consider null as an incorrect answer
    }
  }, [countdown, timeOutMode]);

  if (!questionData)
    return (
      <div className="min-h-[100svh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
        <span className="text-3xl font-bold w-3/4 text-center">Loading...</span>
      </div>
    );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    selectAnswer(option);

    setTimeout(() => {
      setShowAnswer(false);
      setSelectedOption(null);
    }, 950);
  };

  function decodeHTMLEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <div className="min-h-[100svh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
      {timeOutMode && (
        <div className="grid relative place-items-center">
          <CountdownCircle countdown={countdown} />
          <span className="absolute text-lg font-bold">{countdown}</span>
        </div>
      )}
      <h1
        className="text-3xl font-bold w-3/4 text-center"
        dangerouslySetInnerHTML={{
          __html: decodeHTMLEntities(questionData.question),
        }}
      />
      {shuffledOptions.map((option, index) => {
        let buttonClass =
          "bg-white text-blue-700 font-semibold py-2 px-5 w-3/4 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out";
        if (showAnswer) {
          if (option === questionData.correct_answer) {
            buttonClass =
              "bg-green-400 text-white font-semibold py-2 px-5 w-3/4 rounded-md";
          } else if (option === selectedOption) {
            buttonClass =
              "bg-red-400 text-white font-semibold py-2 px-5 w-3/4 rounded-md";
          }
        }
        return (
          <button
            disabled={showAnswer || countdown === 0}
            key={index}
            onClick={() => handleOptionClick(option)}
            className={buttonClass}
          >
            {decodeHTMLEntities(option)}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionPage;
