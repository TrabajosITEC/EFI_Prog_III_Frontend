import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid2 as Grid } from "@mui/material";
import { Container } from "@mui/material";

import { authService } from "../services/token";
import CarouselComponent from "./Carousel";
import GameCard from "./GameCard";
import { fetchGames } from "../hooks/fetchGames";

import image from '../img/pslogo.png';
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
      <Grid container spacing={2} sx={{ marginTop: '150px', justifyContent: 'space-between' }}>
        {games.slice(0, 4).map((game) => (
          <Grid item='true' xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              id={game.id}
              title={game.title}
              price={game.price}
              description={'short game description'}
              image={getImageByPlatform(game.platform)}
              plataform={game.platform}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
