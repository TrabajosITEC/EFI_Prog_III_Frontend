import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Grid2 as Grid,
  IconButton,
  TextField
} from '@mui/material';
import { authService } from "../services/token";
import pcImage from '../img/pc.png';
import nintendoImage from '../img/nintendo.png';
import xboxImage from '../img/xbox.png';
import psImage from '../img/pslogo.png';
import defaultImage from '../img/green.png';
import { grey, purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { Button } from 'primereact/button';
import {  useNavigate } from 'react-router-dom';

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
    } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
    }
  };

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

  if (!game) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: '800px',
        padding: '2rem',
        margin: '0 auto',
        borderRadius: '16px',
        border: `2px solid ${purple[800]}`,
        backgroundColor: grey[800]
      }}
    >
      <Grid item xs={12} sm={6} md={4} style={{ marginRight: '2rem' }}>
        <img
          src={getImageByPlatform(game.platform)}
          alt={`${game.platform}`}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '400px',
            maxHeight: '400px',
            objectFit: 'contain'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Typography variant="h3" color="white" className='font-bold underline'>{game.title}</Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], textDecoration: '' }}>
          Genre:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {game.genre}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Platform:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {game.platform}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Price:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          ${game.price.toFixed(2)}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Status:
        </Typography>
        <Typography variant="body1" style={{ color: game.available ? 'white' : 'red', marginBottom: '1rem' }}>
          {game.available ? 'In Stock' : 'Out of Stock'}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <IconButton onClick={handleDecrement} color="primary" disabled={!game.available}>
            <RemoveIcon style={{ color: purple[600] }} />
          </IconButton>
          <TextField
            type="number"
            value={quantity}
            variant="outlined"
            disabled={!game.available}
            onChange={handleQuantityChange}
            style={{ borderRadius: '16px' }}
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
            <AddIcon style={{ color: purple[600] }} />
          </IconButton>
        </div>
        <Button label="Add to Cart" icon="pi pi-shopping-cart" 
        onClick={()=>handleAddToCart()} disabled={!game.available} className='bg-purple-800 mt-2 border-none' />
      </Grid>
    </Grid>
  );
};

export default GameDetail;
