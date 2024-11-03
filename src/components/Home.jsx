import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid2 as Grid } from "@mui/material";
import { Container } from "@mui/material";

import { authService } from "../services/token";
import CarouselComponent from "./Carousel";
import GameCard from "./GameCard";
import { fetchGames } from "../hooks/fetchGames";

import image from '../img/pslogo.png';

const API = import.meta.env.VITE_API;

export default function Home() {
  const location = useLocation();
  const { userActive } = location.state || {};
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state?.filteredGames) {
        setGames(location.state.filteredGames);
      
      } else {
        const obtainGames = await fetchGames();
        setGames(obtainGames);

      };
    
    };

    fetchData();

  }, [location.state]);
  
  return (
    <Container>
      <CarouselComponent />
      <Grid container spacing={2} sx={{ marginTop: '150px', justifyContent: 'space-between' }}>
        {games.slice(0, 4).map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              title={game.title}
              price={game.price}
              image={image}
              plataform={game.platform}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
