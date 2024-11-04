import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import '../styles/MainLayout.css'

export const MainLayOut = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box
        className='body-color'
        component="main"
        sx={{
          overflowX: 'hidden',
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '200px',
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

MainLayOut.propTypes = {
  children: PropTypes.node.isRequired,
};
