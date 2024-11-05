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
import logoutIcon from '../assets/box-arrow-left.svg'

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
        setState({ ...state, right: false });
        navigate("/");
    };

    const handleSearch = (game) => {
        console.log("Búsqueda de:", game);
        navigate(`/game/${game.id}`);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };

    const handleMoveSideBar = (route) => {
        navigate(`${route}`)
        setTimeout(() => {
            window.scrollTo(20, 20);
        }, 0);
    }

    const handleMove = (route, param = undefined) => {
        navigate(`${route}`, param)
        setTimeout(() => {
            window.scrollTo(900, 900);
        }, 0);
    }

    const handleMoveHome = (route, param = undefined) => {
        navigate(`${route}`, param)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }


    const sidebarItems = [
        {
            label: 'Carrito',
            icon: <ShoppingCartIcon />,
            command: () => handleMoveSideBar("/cart"),
        },
        {
            label: 'Mis Compras',
            icon: <ListIcon />,
            command: () => handleMoveSideBar("/myPurchases"),
        },
        {
            label: 'Mi Perfil',
            icon: <AccountCircleIcon />,
            command: () => handleMoveSideBar(`/user/profile`),
        },
    ];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <List sx={{ bgcolor: '#2e2029', width: '300px', color: 'white', height: '100%', position: 'relative' }}>
            {sidebarItems.map((item, index) => (
                <ListItem className='titles' key={index} disablePadding>
                    <ListItemButton onClick={item.command}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                style: {
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '16px',
                                    color: 'white',
                                },
                            }}
                        />
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

                <Button
                    onClick={handleLogout}
                    sx={{ mt: 1, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', }}

                >
                    <img src={logoutIcon} style={{ filter: 'invert(1)' }} alt="logout" /><p className='titles m-0 ms-2'>Cerrar Sesión</p>
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

                handleMoveHome("/", { state: { filteredGames } });

            } else {
                const filteredGames = games.filter(game => game.platform === label);

                handleMove("/", { state: { filteredGames } });

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
                            variant='outlined'
                            onClick={() => navigate("/login")}
                            sx={{
                                maxHeight: '47px',
                                color: 'white',
                                textTransform: 'uppercase',
                                opacity: 0.8,
                                borderRadius: 1,
                                mr: 1,
                                '&:hover': {
                                    bgcolor: purple['#382331f2'],
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
