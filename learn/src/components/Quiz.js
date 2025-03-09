import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import bgImage from "../assets/images/bgforquiz.jpg";

// Question bank
const questions = {
  easy: {
    verbal: [
      { question: "Point to the letter 'A'.", options: ["A", "B", "C"], answer: "A" },
      { question: "How many fingers am I holding up?", options: ["1", "2", "3"], answer: "2" },
    ],
    numbers: [
      { question: "What is 1+1?", options: ["1", "2", "3"], answer: "2" },
      { question: "How many legs does a dog have?", options: ["2", "4", "6"], answer: "4" },
    ],
  },
  medium: {
    alphabets: [
      { question: "What is the next letter after 'C'?", options: ["D", "E", "F"], answer: "D" },
      { question: "What letter comes after 'M'?", options: ["L", "N", "O"], answer: "N" },
    ],
    communication: [
      { question: "How do you say hello?", options: ["Wave", "Clap", "Jump"], answer: "Wave" },
      { question: "What do you do when you need help?", options: ["Ask", "Stay silent", "Run away"], answer: "Ask" },
    ],
  },
  hard: {
    animals: [
      { question: "How many legs does a spider have?", options: ["6", "8", "10"], answer: "8" },
      { question: "What is the largest land animal?", options: ["Elephant", "Giraffe", "Bear"], answer: "Elephant" },
    ],
    shapes: [
      { question: "How many sides does a hexagon have?", options: ["5", "6", "7"], answer: "6" },
      { question: "What shape has four equal sides?", options: ["Square", "Rectangle", "Triangle"], answer: "Square" },
    ],
  },
};

// Styled components
const Container = styled.div`
  background: url(${bgImage}) no-repeat center center/cover;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 15px 25px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #6a5acd, #ff69b4, #4169e1);
  color: white;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const QuizCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  color: black;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Quiz = () => {
  const [level, setLevel] = useState(null);
  const [topic, setTopic] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [endTime, setEndTime] = useState(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const startQuiz = () => {
    if (level && topic) {
      const selectedQuestions = questions[level][topic].slice(0, 6);
      setQuizQuestions(selectedQuestions);
      setCurrentIndex(0);
      setScore(0);
      setEndTime(null);
    }
  };

  const handleAnswer = (answer) => {
    if (quizQuestions[currentIndex].answer === answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert("Wrong!");
    }
    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setEndTime(Date.now());
    }
  };

  return (
    <Container>
      {!level ? (
        <>
          <h1>Select Level</h1>
          <Button onClick={() => setLevel("easy")}>Easy</Button>
          <Button onClick={() => setLevel("medium")}>Medium</Button>
          <Button onClick={() => setLevel("hard")}>Hard</Button>
        </>
      ) : !topic ? (
        <>
          <h1>Select Topic</h1>
          {Object.keys(questions[level]).map((t) => (
            <Button key={t} onClick={() => setTopic(t)}>{t}</Button>
          ))}
        </>
      ) : endTime ? (
        <>
          <h2>Quiz Completed!</h2>
          <p>Score: {score}/6</p>
          <Button onClick={() => { setLevel(null); setTopic(null); }}>Restart</Button>
        </>
      ) : (
        <QuizCard>
          <h2 onMouseEnter={() => speak(quizQuestions[currentIndex]?.question)}>{quizQuestions[currentIndex]?.question}</h2>
          {quizQuestions[currentIndex]?.options.map((option, index) => (
            <Button key={index} onClick={() => handleAnswer(option)}>{option}</Button>
          ))}
        </QuizCard>
      )}
    </Container>
  );
};

export default Quiz;
