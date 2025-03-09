import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GameSelection from "./components/GameSelection";
import LearnMode from "./components/LearnMode";
import PlayMode from "./components/PlayMode";
import Report from "./components/Report";
import Favourite from "./components/Favourite"; 
import Quiz from "./components/Quiz";
import Rewards from "./components/Rewards";
import LearnTopic from "./components/LearnTopic"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-selection" element={<GameSelection />} />
      <Route path="/learn" element={<LearnMode />} />
      <Route path="/play" element={<PlayMode />} />
      <Route path="/report" element={<Report />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/learn/:topic" element={<LearnTopic />} />
    </Routes>
  );
}

export default App;