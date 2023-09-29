import React, { useEffect, useState } from "react";

const QuestionPage = (props) => {
  const { questions, currentQuestion, selectAnswer } = props;
  const questionData = questions[currentQuestion];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (questionData) {
      const options = [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
    }
  }, [questionData]);

  if (!questionData)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
        <span className="text-3xl font-bold w-3/4 text-center">Loading...</span>
      </div>
    );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    setTimeout(() => {
      setShowAnswer(false);
      setSelectedOption(null);
      selectAnswer(option);
    }, 1000);
  };

  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-5 space-y-5">
      <h1
        className="text-3xl font-bold w-3/4 text-center"
        dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(questionData.question) }}
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
          disabled={showAnswer}
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
