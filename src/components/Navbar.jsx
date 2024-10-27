import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const startItems = [
        {
            label: 'Home',
            icon: <HomeIcon />,
            command: () => navigate("/"),
        },
        {
            label: 'Mis Compras',
            icon: <ListIcon />,
            command: () => navigate("/misCompras"),
        },
        {
            label: 'Contacto',
            icon: <EmailIcon />,
            command: () => navigate("/about"),
        },
    ];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = () => (

        <List sx={{ bgcolor: purple[800] }} className='h-full'>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar position="fixed" sx={{ bgcolor: purple[800] }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {startItems.map((item, index) => (
                        <Button
                            key={index}
                            startIcon={item.icon}
                            onClick={item.command}
                            sx={{
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

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={toggleDrawer('right', true)}><MenuIcon sx={{ color: 'white' }} /></Button>
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
