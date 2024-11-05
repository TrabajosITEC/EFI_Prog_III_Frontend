import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Grid2 as Grid } from "@mui/material";
import CarouselComponent from "./Carousel";
import GameCard from "./GameCard";
import { fetchGames } from "../hooks/fetchGames";

import { getImageByPlatform } from '../utils/getImageByPlatform.js'
import { FilterGamesBy } from "../utils/FilterGames.jsx";

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
      <Grid container spacing={2} sx={{ marginTop: '150px', justifyContent: 'center' }}>
        {games.slice(0, 4).map((game) => (
          <Grid item='true' xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              id={game.id}
              title={game.title}
              genre={game.genre}
              price={game.price}
              image={getImageByPlatform(game.platform)}
              plataform={game.platform}
            />
          </Grid>
        ))}
      </Grid>

      <FilterGamesBy attr={'price'} value={'200'} title={'A menos de ARS$ 200'} />
    
      <FilterGamesBy attr={'genre'} value={'Sports'} title={'Basados en deportes'} />

      <FilterGamesBy attr={'genre'} value={'RPG'} title={'Universos RPG por descubrir'} />
        
    </Container>
  );
}
