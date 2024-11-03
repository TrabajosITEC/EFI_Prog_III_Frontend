import { authService } from "../services/token";

const API = import.meta.env.VITE_API;

export const fetchGames = async() => {
  const token = authService.getToken();
  try {
    const response = await fetch(`${API}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await response.json();

    if (!response.ok) {
      authService.removeToken();
      throw new Error(data.message || JSON.stringify(data));
    }

    return data;

  } catch (error) {
    const errorMessage = error.message || JSON.stringify(error);
    console.error("Mensaje de error:", errorMessage);
  } finally {
    console.log("Llegue al finally")
  }

};