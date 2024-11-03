import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import CarouselComponent from "./Carousel";
import { Grid2 as Grid, Container } from "@mui/material";
import { authService } from "../services/token";
import pcImage from '../img/pc.png';
import nintendoImage from '../img/nintendo.png';
import xboxImage from '../img/xbox.png';
import psImage from '../img/pslogo.png';
import defaultImage from '../img/green.png';

const API = import.meta.env.VITE_API;

export default function Home() {
  const location = useLocation();
  const { userActive } = location.state || {};
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const token = authService.getToken();
      try {
        const response = await fetch(`${API}/games`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        });

        const data = await response.json();
        console.log("🚀 ~ fetchGames ~ data:", data)

        if (!response.ok) {
          authService.removeToken();
          throw new Error(data.message || JSON.stringify(data));
        }

        setGames(data)
        

      } catch (error) {
        const errorMessage = error.message || JSON.stringify(error);
        console.error("Mensaje de error:", errorMessage);
      } finally {
        console.log("Llegue al finally")
      }
    };
    fetchGames();
  }, []);

  const getImageByPlatform = (platform) => {
    switch (platform) {
      case 'PC':
        return pcImage;
      case 'NINTENDO':
        return nintendoImage;
      case 'XBOX':
        return xboxImage;
      case 'PS2':
      case 'PS3':
      case 'PS4':
      case 'PS5':
        return psImage;
      default:
        return defaultImage;
    }
  };

  return (
    <Container>
      <CarouselComponent />
      <Grid container spacing={2} sx={{ mt: 5, justifyContent: 'space-between' }}>
        {games.slice(0, 4).map((game) => (
          <Grid item='true' xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              id={game.id}
              title={game.title}
              description={'short game description'}
              image={getImageByPlatform(game.platform)}
              platform={game.platform}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
