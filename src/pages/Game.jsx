import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { backupQuestions } from "../data/backupQuestions";

import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import SummaryPage from "./SummaryPage";
import RankingPage from "./RankingPage";
import SettingsPage from "./SettingsPage";
import Page404 from "./Page404";

import correctAnswerSound from "../assets/music/correct.mp3";
import incorrectAnswerSound from "../assets/music/incorrect.mp3";
import toast from "react-hot-toast";

const correctAudio = new Audio(correctAnswerSound);
const incorrectAudio = new Audio(incorrectAnswerSound);

function Game() {
  let navigate = useNavigate();
  let fetchTimer;
  const [isLoading, setIsLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [categoryId, setCategoryId] = useState(9);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [timeOutMode, setTimeOutMode] = useState(
    localStorage.getItem("timeOutMode") === "true"
  );

  useEffect(() => {
    /* Setea los valores guardados en locale storage si los hay */
    localStorage.getItem("difficulty") !== null &&
      setDifficulty(localStorage.getItem("difficulty"));

    localStorage.getItem("questionAmount") !== null &&
      setQuestionAmount(localStorage.getItem("questionAmount"));

    localStorage.getItem("category") !== null &&
      setCategoryId(localStorage.getItem("category"));

    localStorage.getItem("timeOutMode") !== null && setTimeOutMode(timeOutMode);
  }, []);

  const toggleTimeOut = () => {
    localStorage.setItem("timeOutMode", !timeOutMode);
    setTimeOutMode(!timeOutMode);
  };

  const resetGame = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);

    fetchQuestions();
  };

  const fetchQuestions = (retryCount = 3) => {
    if (isLoading) {
      // If a request is already in progress, do nothing
      return;
    }

    setIsLoading(true);

    fetch(
      `https://opentdb.com/api.php?amount=${questionAmount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.response_code === 0) {
          setQuestions(data.results);
        } else {
          if (retryCount > 0) {
            // Retry the request with an increasing delay
            setTimeout(
              () => fetchQuestions(retryCount - 1),
              1000 * (4 - retryCount)
            );
          } else {
            setQuestions(backupQuestions);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching trivia questions:", error);
        toast.error("Error fetching trivia questions. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
        // Set a timer to allow fetching again after 5 seconds
        fetchTimer = setTimeout(() => {
          fetchTimer = null; // Reset the timer variable
        }, 5000);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryId, questionAmount, difficulty]);

  const selectAnswer = (selectedOption) => {
    if (selectedOption === null) {
      // Si el usuario no selecciona una respuesta, se considera incorrecta
      selectedOption = "incorrect";
    }
    const correctAnswer = questions[currentQuestion].correct_answer;

    // Si la respuesta es correcta, incrementa el puntaje
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      correctAudio.play();
    } else {
      incorrectAudio.play();
    }

    // Si hay más preguntas, avanza a la siguiente. Sino, redirige al resumen.
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/summary");
      }
    }, 950);
  };

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route
        path="/"
        exact
        element={
          <HomePage
            resetGame={resetGame}
            questionAmount={questionAmount}
            categoryId={categoryId}
            difficulty={difficulty}
            toggleTimeOut={toggleTimeOut}
            timeOutMode={timeOutMode}
          />
        }
      />
      <Route
        path="/question"
        element={
          <QuestionPage
            questions={questions}
            currentQuestion={currentQuestion}
            selectAnswer={selectAnswer}
            timeOutMode={timeOutMode}
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
            score={score}
            timeOutMode={timeOutMode}
          />
        }
      />
      <Route
        path="/ranking"
        element={
          <RankingPage
            score={score}
            setScore={setScore}
            resetGame={resetGame}
            timeOutMode={timeOutMode}
          />
        }
      />
      <Route
        path="/settings"
        element={
          <SettingsPage
            setDifficulty={setDifficulty}
            setCategoryId={setCategoryId}
            setQuestionAmount={setQuestionAmount}
          />
        }
      />
    </Routes>
  );
}

export default Game;
