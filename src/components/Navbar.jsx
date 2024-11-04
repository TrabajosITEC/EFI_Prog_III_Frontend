import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import { authService } from "../services/token";

export default function NavBar() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        right: false,
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
            setUserId(authService.getUserId());
            setUserName(authService.getUserName() || 'Usuario');
        }
    }, []);

    const handleLogout = () => {
        authService.removeToken();
        setIsAuthenticated(false);
        navigate("/");
    };

    const handleSearch = (game) => {
        console.log("Búsqueda de:", game);
        navigate(`/game/${game.id}`);
    };

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
            command: () => navigate(`user/profile`),
        },
    ];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
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
                <ListItemText primary={userName} sx={{ textAlign: 'center', color: 'white' }} />
                <Button
                    onClick={handleLogout}
                    sx={{ mt: 1, color: 'red' }}
                >
                    Cerrar sesión
                </Button>
            </ListItem>
        </List>
    );

    const obtainGames = async (response, label, id) => {
        if (typeof response === 'function') {
            const games = await response();

            if (id === 'Home') {
                const filteredGames = games;

                console.log(filteredGames);

                navigate("/", { state: { filteredGames } });

            } else {
                const filteredGames = games.filter(game => game.platform === label);

                navigate("/", { state: { filteredGames } });

            };

        };

    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            startIcon={item.icon}
                            onClick={() => obtainGames(item.command, item.label, item.id)}
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
                    {isAuthenticated ? (
                        <Button onClick={toggleDrawer('right', true)}>
                            <MenuIcon sx={{ color: 'white' }} />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
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
                            Iniciar sesión / Registrarse
                        </Button>
                    )}
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
