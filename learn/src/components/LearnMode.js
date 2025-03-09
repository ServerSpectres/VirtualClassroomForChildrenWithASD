import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaPaw, FaBars, FaQuestionCircle, FaHeart, FaMoon, FaArrowLeft, FaGift } from "react-icons/fa";

// Import assets and sounds
import fruitImg from "../assets/images/fruits.jpg";
import numberImg from "../assets/images/numbers.jpg";
import alphabetImg from "../assets/images/alpha.jpg";
import poemImg from "../assets/images/poems.jpg";
import solvingImg from "../assets/images/solving.jpg";
import commImg from "../assets/images/comm.jpg";
import nonVerbalCommImg from "../assets/images/non.jpg";
import storiesImg from "../assets/images/stories.jpg";
import fruitSound from "../assets/images/fruits.mp3";
import numberSound from "../assets/images/numbers.mp3";
import alphabetSound from "../assets/images/Alphabets.mp3";
import poemSound from "../assets/images/poems.mp3";
import solvingSound from "../assets/images/solving.mp3";
import commSound from "../assets/images/scommunication.mp3";
import nonVerbalCommSound from "../assets/images/nonverbal.mp3";
import storiesSound from "../assets/images/stories.mp3";

// Categories
const categories = [
  { name: "verbal communictaion", img: commImg, sound: commSound},
  { name: "Non-Verbal Communication", img: nonVerbalCommImg, sound: nonVerbalCommSound },
  { name: "Fruits", img: fruitImg, sound: fruitSound },
  { name: "Numbers", img: numberImg, sound: numberSound },
  { name: "Alphabets", img: alphabetImg, sound: alphabetSound },
  { name: "Moral Stories", img: storiesImg, sound: storiesSound },
  { name: "Poems", img: poemImg, sound: poemSound },
  { name: "Problem Solving", img: solvingImg, sound: solvingSound },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: ${(props) => (props.darkMode ? "#263238" : "#b3e5fc")};
  color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  position: relative;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

const BackButton = styled(Link)`
  font-size: 28px;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const MenuButton = styled(FaBars)`
  font-size: 28px;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index:35;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: black;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    background: #b3e5fc;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #0288d1;
  border-radius: 10px;
  padding: 8px 16px;
  width: 100%;
  max-width: 1200px;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px;
`;

const PawIcon = styled(FaPaw)`
  font-size: 24px;
  color: #0288d1;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 60px;
  width: 50%;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #b3e5fc;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 85%;
  max-width: 1200px;
  margin-top: 20px;
  padding: 10px;
`;

const Card = styled.div`
  position: relative;
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: ${({ favorited }) => (favorited ? "#ff4081" : "#ccc")};
  transition: color 0.3s;
  &:hover {
    color: #ff4081;
  }
`;



const Image = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const LearnButton = styled(Link)`
  padding: 12px 24px;
  font-size: 18px;
  color: white;
  background: #ff6600;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center items */
  gap: 15px; /* Space between heart and button */
  margin-top: 10px;
`;




const LearnMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [audio, setAudio] = useState(new Audio());
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredCategories(categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const toggleFavorite = (category) => {
    setFavorites((prev) => {
      let updatedFavorites;
      if (prev.some((fav) => fav.name === category.name)) {
        updatedFavorites = prev.filter((fav) => fav.name !== category.name);
        alert(`${category.name} removed from favorites! ❌`);
      } else {
        updatedFavorites = [...prev, category];
        alert(`${category.name} added to favorites! ✅`);
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleCardHover = (sound) => {
    if (audio.src !== sound) {
      audio.pause();
      audio.src = sound;
      audio.load();
      audio.play().catch((error) => console.error("Audio play failed", error));
    }
  };

  return (
    <Container darkMode={darkMode}>
      <Header>
        <BackButton to="/game-selection">
          <FaArrowLeft />
        </BackButton>
        <div ref={menuRef}>
          <MenuButton darkMode={darkMode} onClick={() => setMenuOpen(!menuOpen)} />
          <DropdownMenu open={menuOpen}>
            <MenuItem to="/quiz">
              <FaQuestionCircle style={{ color: "#ffcc00" }} /> Quiz
            </MenuItem>
            <MenuItem to="/favourite">
              <FaHeart style={{ color: "#ff4081" }} /> Favorite
            </MenuItem>
            <MenuItem to="/rewards">
              <FaGift style={{ color: "#4caf50" }} /> Rewards
            </MenuItem>
            <MenuItem onClick={() => setDarkMode(!darkMode)}>
              <FaMoon style={{ color: "#607d8b" }} /> Dark Mode
            </MenuItem>
          </DropdownMenu>
        </div>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <PawIcon />
        </SearchContainer>
      </Header>

      {searchTerm && (
        <Suggestions>
          {filteredCategories.map((category, index) => (
            <SuggestionItem key={index}>{category.name}</SuggestionItem>
          ))}
        </Suggestions>
      )}

      <CardContainer>
        {filteredCategories.map((category, index) => {
          const isFavorited = favorites.some((fav) => fav.name === category.name);
          return (
            <Card key={index} darkMode={darkMode} onMouseEnter={() => handleCardHover(category.sound)}>
              <Image src={category.img} alt={category.name} />
              <Name>{category.name}</Name>
              <ButtonContainer>
  <LearnButton to={`/learn/${category.name}`}>Learn</LearnButton>
  <HeartIcon favorited={isFavorited} onClick={() => toggleFavorite(category)} />
</ButtonContainer>

            </Card>
          );
        })}
      </CardContainer>
    </Container>
  );
};

export default LearnMode;
