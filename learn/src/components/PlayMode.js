import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import formVideo from "../assets/images/form.mp4";

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Ensures it covers the entire container */
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* Dark overlay */
  z-index: 0;
`;

const Popup = styled.div`
  position: relative;
  background: rgba(33, 150, 243, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const Title = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  background: ${(props) => props.bgColor};
  color: white;
  padding: 12px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background: ${(props) => props.hoverColor};
    transform: scale(1.05);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.7);
  color: black;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;

const Play = () => {
  const navigate = useNavigate();

  const handleSelection = (group) => {
    navigate(`/games?age=${group}`);
  };

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted playsInline>
        <source src={formVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      {/* Dark Overlay */}
      <Overlay />

      {/* Back Button */}
      <BackButton onClick={() => navigate("/game-selection")}>Back</BackButton>

      {/* Popup Form */}
      <Popup>
        <Title>Select Age Group</Title>
        <Button
          bgColor="#42a5f5"
          hoverColor="#1e88e5"
          onClick={() => handleSelection("3-5")}
        >
          3-5 Years
        </Button>
        <Button
          bgColor="#66bb6a"
          hoverColor="#43a047"
          onClick={() => handleSelection("6-9")}
        >
          6-9 Years
        </Button>
        <Button
          bgColor="#ab47bc"
          hoverColor="#8e24aa"
          onClick={() => handleSelection("9-12")}
        >
          9-12 Years
        </Button>
      </Popup>
    </Container>
  );
};

export default Play;
