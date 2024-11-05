import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/joy';

import GameCard from '../components/GameCard';
import { fetchGames } from '../hooks/fetchGames';
import { getImageByPlatform } from './getImageByPlatform';

export const FilterGamesBy = ({ attr, value, title }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const games = await fetchGames();

      if (attr !== 'price') {
        const filteredGames = games.filter(game => game[attr] === value);
  
        setGames(filteredGames);

      } else if (attr === 'price') {
        const parseValue = parseFloat(value);

        const filteredGames = games.filter(game => game.price < parseValue);
  
        setGames(filteredGames);

      };

    };

    fetchData();

  }, [attr, value]);

  return (
    <>  
      <h4 className="text-left text-white titles" style={{ marginTop: '120px' }}>{title}</h4>

      <Grid container spacing={2} sx={{ marginTop: '20px', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        {games.slice(0, 3).map((game) => (
          <Grid item xs={12} sm={6} md={3} key={game.id}>
            <GameCard 
              id={game.id}
              title={game.title}
              genre={game.genre}
              price={game.price}
              image={getImageByPlatform(game.platform)}
              platform={game.platform}
            />
          </Grid>
        ))}
      </Grid>
    </>

  );

};
