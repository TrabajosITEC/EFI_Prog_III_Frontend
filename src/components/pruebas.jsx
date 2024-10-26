// import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { authService } from "../services/token";
const API = import.meta.env.VITE_API;

export default function Home() {
  // const location = useLocation()
  // const { userActive } = location.state || {}

  // Variables de usuario:
  const UserId = authService.getUserId()
  const UserName = authService.getUserName()
  const UserRole = authService.getUserRole()

  // Variables para Games:
  const [games, setGames] = useState([])

  // Variables para Purchases:
  const [purchases, setPurchases] = useState([])

  // EndPoint  de Games:
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

    // EndPoint  de Purchases by id:

    useEffect(() => {
      const fetchPurchases = async () => {
        const token = authService.getToken();
        try {
          const response = await fetch(`${API}/purchases`, {
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
          
          setPurchases(data)
          
        } catch (error) {
          const errorMessage = error.message || JSON.stringify(error);
          console.error("Mensaje de error:", errorMessage);
        }finally {
          console.log("Llegue al finally")
        }
      };
      fetchPurchases();
    }, []);



  console.log("🚀 ~ Home ~ userActive:", UserName);

  return (
    <div>
      <h4>Detalle del usuario logueado</h4>
      <p>Usuario: {UserName}</p>
      <p>ID: {UserId}</p>
      <p>Role: {UserRole}</p>

      <h4>Nombre de los juegos en Stock</h4>      
      <div>
        {games.map(game => (
          <div key={game.id}>
            <p>{game.title}</p>
          </div>
        ))}
      </div>

      <h4>Detalle de las compras registradas</h4>      
      <div>
        {purchases.map(purchase => (
          <div key={purchase.id}>
            <p>{purchase.user_id} - {purchase.date} - {purchase.total} </p>
          </div>
        ))}
      </div>

      {authService.getUserRole() === "gamer" ? <p>Es un usuario gamer</p> : <p> no es</p> }
      {/* Logica que aplicaria solo para el admin */}
    </div>
  );
}