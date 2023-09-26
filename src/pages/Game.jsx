import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import SummaryPage from "./SummaryPage";
import RankingPage from "./RankingPage";

function Game() {
  let navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [categoryId, setCategoryId] = useState(9);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");

  const resetGame = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);

    fetchQuestions();
  };

  const fetchQuestions = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${questionAmount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      })
      .catch((error) =>
        console.error("Error fetching trivia questions:", error)
      );
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const selectAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].correct_answer;

    // Si la respuesta es correcta, incrementa el puntaje
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      console.log("Score:", score);
    }

    // Si hay más preguntas, avanza a la siguiente. Sino, redirige al resumen.
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/summary");
    }
  };

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route
        path="/question"
        element={
          <QuestionPage
            questions={questions}
            currentQuestion={currentQuestion}
            selectAnswer={selectAnswer}
          />
        }
      />
      <Route
        path="/summary"
        element={
          <SummaryPage
            correctAnswers={score}
            totalQuestions={questionAmount}
            resetGame={resetGame}
          />
        }
      />
      <Route path="/ranking" element={<RankingPage score={score}/>} />
    </Routes>
  );
}

export default Game;
