import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import Logo from '../assets/Logo.png';
import { authService } from "../services/token";

export default function NavBar() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        right: false,
    });
    const handleSearch = (game) => {
        console.log("Búsqueda de:", game);
        navigate(`/game/${game.id}`);
    };
    const navItems = [
        {
            icon: <img src={Logo} style={{ width: '100px', height: '47px', objectFit: 'cover' }} />,
            command: () => navigate("/"),
        },
        {
            label: 'Playstation',
            icon: <i className="ri-playstation-line"></i>
        },
        {
            label: 'Xbox',
            icon: <i className="ri-xbox-line"></i>
        },
        {
            label: 'Nintendo',
            icon: <i className="ri-switch-line"></i>
        },
        {
            label: 'PC',
            icon: <i className="ri-computer-line"></i>
        }
    ];

    const sidebarItems = [
        {
            label: 'Carrito',
            icon: <ShoppingCartIcon />,
            command: () => navigate("/cart"),
        },
        {
            label: 'Mis Compras',
            icon: <ListIcon />,
            command: () => navigate("/misCompras"),
        },
        {
            label: 'Mi Perfil',
            icon: <AccountCircleIcon />,
            command: () => navigate("/profile"),
        },
    ];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const cerrarSesion = () => {
        authService.removeToken();
        navigate("/login")
    }

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
                <ListItemText primary={authService.getUserName()} sx={{ textAlign: 'center', color: 'white' }} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => cerrarSesion()}
                    sx={{ mt: 1 }}
                >
                    Cerrar sesión
                </Button>
            </ListItem>
        </List>
    );

    return (
        <AppBar position="fixed" sx={{ bgcolor: purple[800] }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            startIcon={item.icon}
                            onClick={item.command}
                            sx={{
                                maxHeight: '47px',
                                color: 'white',
                                textTransform: 'uppercase',
                                bgcolor: purple[800],
                                opacity: 0.8,
                                borderRadius: 1,
                                mr: 1,
                                '&:hover': {
                                    bgcolor: purple[600],
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
