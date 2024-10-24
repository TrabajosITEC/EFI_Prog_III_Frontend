import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
const API = import.meta.env.VITE_API;

export default function Home() {
  const location = useLocation()
  const { userActive } = location.state || {}
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API}/games`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Para el token:
            // "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          },
        });
        
        const data = await response.json()
        console.log("🚀 ~ data:", data)
        
        if (!response.ok) {
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
      <p>Hola {userActive}</p>
      
      <div>
        {games.map(game => (
          <div key={game.id}>
            {game.name}
          </div>
        ))}
      </div>
    </div>
  );
}