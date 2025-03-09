import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import verbalVideo from "../assets/images/scommunication.mp3";
import nonVerbalVideo from "../assets/images/nonverbal.mp3";
import backgroundImage from "../assets/images/logofornlearnmode.mp4";
import learnLogo from '../assets/images/logofornlearnmode.mp4';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-transform: capitalize;
`;

const Card = styled.div`
  width: 90%;
  max-width: 800px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  padding: 15px;
  margin-bottom: 20px;
  border: 2px solid #800080;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Reusable Video Component with Blob URL Fix
const VideoCard = ({ src, title, isLocal }) => {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (isLocal) {
      fetch(src)
        .then(response => response.blob())
        .then(blob => setBlobUrl(URL.createObjectURL(blob)))
        .catch(error => console.error("Error loading video:", error));
    }
  }, [src, isLocal]);

  return (
    <Card>
      {isLocal ? (
        <video controls width="100%" height="450px" style={{ borderRadius: "10px" }}>
          <source src={blobUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <iframe
          width="100%"
          height="450px"
          src={src}
          title={title}
          allowFullScreen
          style={{ borderRadius: "10px" }}
        />
      )}
    </Card>
  );
};

const LearnTopic = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const lowerTopic = topic?.toLowerCase() || "";

  // Video Data
  const videos = {
    fruits: [{ src: "https://www.youtube.com/embed/aucmuMTEjIY", title: "Fruits Video" }],
    "verbal communication": [{ src: "https://youtu.be/mcxqjvubAaw?si=pJ5-FiE8m2IdTct7", title: "Verbal Communication", isLocal: true }],
    "non-verbal communication": [{ src: "https://youtu.be/rdYg8LEdVfY?si=77JrN1MXAKQrydcb", title: "Non-Verbal Communication", isLocal: true }],
    poems: [
      { src: "https://www.youtube.com/embed/AIIj0mBX1jU", title: "Poem Video 1" },
      { src: "https://www.youtube.com/embed/jGF5UjX8Ch8", title: "Poem Video 2" },
      { src: "https://www.youtube.com/embed/EA_fbT6oN2k", title: "Poem Video 3" }
    ],
    "problem solving": [
      { src: "https://www.youtube.com/embed/Sd9MZdB1ItU", title: "Problem Solving Video 1" },
      { src: "https://www.youtube.com/embed/DYQ2TktgfJo", title: "Problem Solving Video 2" }
    ],
    alphabets: [
      { src: "https://www.youtube.com/embed/ccEpTTZW34g?start=8", title: "Alphabet Video 1" },
      { src: "https://www.youtube.com/embed/B44j3tKV5qw?start=8", title: "Alphabet Video 2" },
      { src: "https://www.youtube.com/embed/C7oebqj3PCY?start=8", title: "Alphabet Video 3" }
    ],
    numbers: [
      { src: "https://www.youtube.com/embed/D0Ajq682yrA", title: "Numbers Video 1" },
      { src: "https://www.youtube.com/embed/By2hmo323xM", title: "Numbers Video 2" },
      { src: "https://www.youtube.com/embed/OnJlGMgqBes", title: "Numbers Video 3" }
    ],
    "moral stories": [
      { src: "https://www.youtube.com/embed/52g8NiopV0U", title: "Moral Story Video 1" },
      { src: "https://www.youtube.com/embed/Zxji4mUdI_o", title: "Moral Story Video 2" },
      { src: "https://www.youtube.com/embed/bb7LofNTjOQ", title: "Moral Story Video 3" },
      { src: "https://www.youtube.com/embed/bw_5JfrQ-aE", title: "Moral Story Video 4" },
      { src: "https://www.youtube.com/embed/w_b5c0cva3A", title: "Moral Story Video 5" }
    ]
  };

  return (
    <Container>
      <Title>{topic}</Title>
      {videos[lowerTopic]?.map((video, index) => (
        <VideoCard key={index} src={video.src} title={video.title} isLocal={video.isLocal} />
      ))}
      <BackButton onClick={() => navigate("/learn")}>← Back to Learn</BackButton>
    </Container>
  );
};

export default LearnTopic;