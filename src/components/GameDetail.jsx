import { useEffect, useState } from 'react';
import {
  Typography,
  Grid2 as Grid,
  IconButton,
  TextField
} from '@mui/material';
import { authService } from "../services/token";
import { grey, purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { Button } from 'primereact/button';
import { useParams, useNavigate } from 'react-router-dom';

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { getImageByPlatform } from '../utils/getImageByPlatform';

import '../styles/GameDetail.css'

const API = import.meta.env.VITE_API;

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGame = async () => {
      const token = authService.getToken();
      try {
        const response = await fetch(`${API}/games/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        });

        if (!response.ok) {
          authService.removeToken();
          const data = await response.json();
          throw new Error(data.message || JSON.stringify(data));
        }

        const data = await response.json();
        setGame(data);

      } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
      }
    };

    fetchGame();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    const token = authService.getToken();
    const userId = authService.getUserId()
    const gameId = game.id
    const quantit = quantity
    console.log(userId, gameId, quantit)

    if (!token) {
      navigate("/login")

    }

    try {
      const response = await fetch(`${API}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ userId, gameId, quantity }),
      });

      if (!response.ok) {
        authService.removeToken();
        const data = await response.json();
        throw new Error(data.message || JSON.stringify(data));
      }


      navigate("/cart")
      setTimeout(() => {
        window.scrollTo(20, 20);
      }, 0);
    } catch (error) {
      console.error("Mensaje de error:", error.message || JSON.stringify(error));
    }
  };

  if (!game) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Grid
      className='custom-margin main-font'
      container
      justifyContent="center"
      alignItems="center"
      style={{
        maxWidth: '1000px',
        width: '100%',
        padding: '2rem',
        margin: '0 auto',
        borderRadius: '16px',
        border: `2px solid ${purple[800]}`,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Grid item xs={12} sm={6} md={4} style={{ marginRight: '2rem' }}>
        <img
          src={getImageByPlatform(game.platform)}
          alt={`${game.platform}`}
          style={{
            filter: 'invert(1)',
            marginRight: '40px',
            width: '200px',
            height: '100%',
            maxWidth: '400px',
            maxHeight: '400px',
            objectFit: 'contain'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Typography style={{ fontFamily: 'Montserrat, sans-serif' }} variant="h3" color="white">{game.title}</Typography>

        <Typography variant="h6" className='font-bold ' style={{ marginTop: '1rem', color: purple[600], textDecoration: '', fontFamily: 'Montserrat, sans-serif' }}>
          Género:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          {game.genre}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], fontFamily: 'Montserrat, sans-serif' }}>
          Plataforma:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          {capitalizeFirstLetter(game.platform.toLowerCase())}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], fontFamily: 'Montserrat, sans-serif' }}>
          Precio:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          ARS$ {game.price.toFixed(2)}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], fontFamily: 'Montserrat, sans-serif' }}>
          Estado:
        </Typography>
        <Typography variant="body1" style={{ color: game.available ? 'white' : 'red', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          {game.available ? 'In Stock' : 'Out of Stock'}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <IconButton onClick={handleDecrement} color="primary" disabled={!game.available}>
            <RemoveIcon style={{ color: purple[600], marginTop: '20px' }} />
          </IconButton>
          <TextField
            type="number"
            value={quantity}
            variant="outlined"
            disabled={!game.available}
            onChange={handleQuantityChange}
            style={{ borderRadius: '16px', marginTop: '20px' }}
            sx={{
              width: '100px',
              textAlign: 'center',
              '& input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input::-webkit-outer-spin-button': {
                display: 'none',
              },
              '& .MuiInputBase-input': {
                color: 'white',
                textAlign: 'center',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: purple[600],
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: purple[600],
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: purple[600],
              },
            }}
          />

          <IconButton onClick={handleIncrement} color="primary" disabled={!game.available}>
            <AddIcon style={{ color: purple[600], marginTop: '20px' }} />
          </IconButton>
        </div>
        <Button
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '2px solid purple' }}
          label="Agregar al carrito"
          icon="pi pi-shopping-cart"
          onClick={() => handleAddToCart()}
          disabled={!game.available}
          className='mt-5'
        />
      </Grid>
    </Grid>
  );
};

export default GameDetail;
