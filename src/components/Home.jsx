import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Grid } from "@mui/material"; // Importar Grid2 como Grid
import CarouselComponent from "./Carousel";
import { Container } from "@mui/material";

const API = import.meta.env.VITE_API;

export default function Home() {
  const location = useLocation();
  const { userActive } = location.state || {};
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API}/games`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("🚀 ~ data:", data);

        if (!response.ok) {
          throw new Error(data.message || JSON.stringify(data));
        }

        setGames(data);
      } catch (error) {
        const errorMessage = error.message || JSON.stringify(error);
        console.error("Mensaje de error:", errorMessage);
      }
    };
    fetchGames();
  }, []);

  console.log("🚀 ~ Home ~ userActive:", userActive);

  return (
    <Container>
      <CarouselComponent />
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            title='Game 1'
            description='Description for Game 1'
            image='url_to_image_1.jpg'
            plataform='PS2'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            title='Game 2'
            description='Description for Game 2'
            image='url_to_image_2.jpg'
            plataform='PS2'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            title='Game 3'
            description='Description for Game 3'
            image='url_to_image_3.jpg'
            plataform='PS2'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            title='Game 4'
            description='Description for Game 4'
            image='url_to_image_4.jpg'
            plataform='PS2'
          />
        </Grid>
      </Grid>
    </Container>
  );
}
