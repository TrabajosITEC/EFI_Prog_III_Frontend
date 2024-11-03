import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import SearchBar from './Search';

import { navItems } from '../utils/navItems';
import { sidebarItems } from '../utils/sidebarItems';

export default function NavBar() {
  const navigate = useNavigate();
  
  const [state, setState] = React.useState({
    right: false,
  
  });

  const handleSearch = (game) => {
    navigate(`/games/${game.id}`);
  
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    
    };
    
    setState({ ...state, [anchor]: open });
  
  };

  const obtainGames = async(response, label) => {
    if (typeof response === 'function') {
      const games = await response();
      const filteredGames = games.filter(game => game.platform === label);
  
      navigate("/", { state: { filteredGames } });

    }

  };
  
  const list = () => (
      <List sx={{ bgcolor: purple[800], color: 'white', height: '100%', position: 'relative' }}>
          {sidebarItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                  <ListItemButton onClick={item.command}>
                      <ListItemIcon sx={{ color: 'white' }}>
                          {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                  </ListItemButton>
              </ListItem>
          ))}
          <Divider sx={{ bgcolor: 'white', my: 2 }} />

          <ListItem
              sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: purple[900],
                  py: 2,
              }}
          >
              <ListItemText primary="NombreUsuario" sx={{ textAlign: 'center', color: 'white' }} />
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => { /* Lógica para cerrar sesión */ }}
                  sx={{ mt: 1 }}
              >
                  Cerrar sesión
              </Button>
          </ListItem>
      </List>
  );

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {navItems.map((item, index) => (
            <Button
              key={index}
              startIcon={item.icon}
              onClick={() => obtainGames(item.command, item.label)}
              sx={{
                color: 'white',
                textTransform: 'uppercase',
                bgcolor: 'rgba(0, 0, 0, 0)',
                opacity: 0.8,
                borderRadius: 1,
                mr: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  color: 'white',
                  opacity: 1,
                },
              }}
              >
              {item.label}
            </Button>
          ))}
        </div>

      <SearchBar onSearch={handleSearch} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={toggleDrawer('right', true)}>
            <MenuIcon sx={{ color: 'white' }} />
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </div>
      </Toolbar>
    </AppBar>
  
  );

}
