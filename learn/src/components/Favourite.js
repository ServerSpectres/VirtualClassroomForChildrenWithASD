import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  background: white;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: #0288d1;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 20px;
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: darkred;
  }
`;

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);

  // Load stored favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove item from favorites
  const removeFavorite = (name) => {
    const updatedFavorites = favorites.filter((item) => item.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save updated favorites
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <BackButton to="/learn">← Back</BackButton>
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <CardContainer>
          {favorites.map((category, index) => (
            <Card key={index}>
              <Image src={category.img} alt={category.name} />
              <Name>{category.name}</Name>
              <RemoveButton onClick={() => removeFavorite(category.name)}>
                Remove
              </RemoveButton>
            </Card>
          ))}
        </CardContainer>
      )}
    </div>
  );
};

export default Favourite;
