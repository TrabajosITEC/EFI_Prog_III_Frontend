import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { authService } from "../services/token";
const API = import.meta.env.VITE_API;

export default function Home() {
  const location = useLocation()
  const { userActive } = location.state || {}
  const [games, setGames] = useState([])
  const  userToken = authService.getUserName()

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
        
        const data = await response.json()
        console.log("🚀 ~ data:", data)
        
        if (!response.ok) {
          authService.removeToken();
          throw new Error(data.message || JSON.stringify(data));
        }
        
        setGames(data)
        
      } catch (error) {
        const errorMessage = error.message || JSON.stringify(error);
        console.error("Mensaje de error:", errorMessage);
      }finally {
        console.log("Llegue al finally")
      }
    };
    fetchGames();
  }, []);

  console.log("🚀 ~ Home ~ userActive:", userActive);

  return (
    <div>
      <p>Hola desde el location {userActive}</p>
      <p>Hola desde el token {userToken}</p>
      
      <div>
        {games.map(game => (
          <div key={game.id}>
            <p>{game.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}