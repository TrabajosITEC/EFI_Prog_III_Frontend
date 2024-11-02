import { fetchGames } from "../hooks/fetchGames";

export const navItems = [
  {
    label: 'PS4',
    icon: <i className="ri-playstation-line"></i>,
    command: async () => {
      const games = await fetchGames();
      return games;
    
    }
  },
  {
    label: 'XBOX',
    icon: <i className="ri-xbox-line"></i>,
    command: async () => {
      const games = await fetchGames();
      return games;
    
    }
  },
  {
    label: 'Nintendo',
    icon: <i className="ri-switch-line"></i>,
    command: async () => {
      const games = await fetchGames();
      return games;
    
    }
  },
  {
    label: 'PC',
    icon: <i className="ri-computer-line"></i>,
    command: async () => {
      const games = await fetchGames();
      return games;
    
    }
  }
];