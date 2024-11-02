import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const sidebarItems = [
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
