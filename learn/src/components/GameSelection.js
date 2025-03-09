import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaArrowLeft } from "react-icons/fa";
import gameSelectionVideo from "../assets/images/intellolearn.mp4";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cce7ff;
  position: relative;
`;

const Card = styled.div`
  position: relative;
  width: 80%;
  max-width: 1200px;
  height: 80vh;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 20px;
`;

const GameButton = styled(Link)`
  padding: 15px 30px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background: #ff6600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  &:hover {
    background: #ff4500;
  }
`;

const MuteButton = styled.button`
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

const BackButton = styled(Link)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 30px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #e0e0e0;
  }
`;

const GameSelection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause(); // Pause video when unmounting
      }
    };
  }, []);

  return (
    <Container>
      <Card>
        <BackgroundVideo ref={videoRef} autoPlay loop>
          <source src={gameSelectionVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </BackgroundVideo>
        <MuteButton onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </MuteButton>
        <BackButton to="/">
          <FaArrowLeft />
        </BackButton>
        <h1>Select a Game Mode</h1>
        <ButtonContainer>
          <GameButton to="/learn">Learn Mode</GameButton>
          <GameButton to="/play">Play Mode</GameButton>
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export default GameSelection;
