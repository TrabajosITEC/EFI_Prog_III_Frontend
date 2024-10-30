import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Grid2 as Grid } from "@mui/material";
import CarouselComponent from "./Carousel";
import { Container } from "@mui/material";
import { authService } from "../services/token";
import image from '../img/pslogo.png';

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
        console.log("🚀 ~ data:", data);

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
  console.log('🚀 ~ Home ~ games:', games);

  return (
    <Container>
      <CarouselComponent />
      <Grid container spacing={2} sx={{ mt: 5, justifyContent: 'space-between' }}>
        {games.slice(0, 4).map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              title={game.title}
              description={'short game description'}
              image={image}
              plataform={game.platform}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
