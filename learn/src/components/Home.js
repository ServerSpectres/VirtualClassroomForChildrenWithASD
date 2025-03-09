import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStopCircle, FaPlayCircle } from "react-icons/fa";
import homeSong from "../assets/images/sounds/home.mp3";
import playVideo from "../assets/images/playf.mp4";

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cce7ff;
`;

const Card = styled.div`
  position: relative;
  width: 80%;
  max-width: 1200px;
  height: 80vh;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const PlayVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StartButton = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: #ff6600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;

  &:hover {
    background: #ff4500;
  }
`;

const MusicButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  color: red;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const audioRef = useRef(new Audio(homeSong));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const playMusic = () => {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
    };

    const handleUserInteraction = () => {
      if (!isPlaying) {
        playMusic();
        setIsPlaying(true);
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.log("Error playing audio:", err));
      setIsPlaying(true);
    }
  };

  return (
    <HomeContainer>
      <Card>
        <MusicButton onClick={toggleMusic}>
          {isPlaying ? <FaStopCircle /> : <FaPlayCircle />}
        </MusicButton>
        <PlayVideo autoPlay loop muted>
          <source src={playVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </PlayVideo>
        <StartButton to="/game-selection">Play</StartButton>
      </Card>
    </HomeContainer>
  );
};

export default Home;