import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export const MainLayOut = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          background: `linear-gradient(360deg, ${grey[900]}, ${grey[700]})`,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '70px',
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
