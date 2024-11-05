import { Box, Typography, Link, Container } from '@mui/material';
import Divider from '@mui/material/Divider';

import 'remixicon/fonts/remixicon.css';
import GamixLogo from '../assets/HorizontalLogo.png'

export default function Footer() {
    return (
        <Box
            style={{backgroundColor: '#000' }}
            component="footer"
            sx={{
                pt: 10,
                pb: 3,
                px: 2,
                mt: 'auto',
                color: 'white',
            }}
        >
            <Container
                sx={{           
                    flexDirection: 'column',   
                    justifyContent: 'center',  
                    alignItems: 'center',
                    marginInline: 'auto',
                    marginBottom: '100px',
                    minHeight: '20vh'  
                }}

                maxWidth='lg'
            >
                <Box sx={{ mt: 1 }}>
                    <Box>
                        <Link to='/'>
                            <img src={GamixLogo} style={{ height: '152px', width: '180px' }} alt='logo' />
                        </Link>
                    </Box>
                    <Link href="https://web.whatsapp.com/" color="inherit" underline="none" sx={{ mr: 2 }}>
                        <i style={{ fontSize: '35px' }} className="ri-whatsapp-line"></i>
                    </Link>
                    <Link href="https://www.instagram.com/?hl=es" color="inherit" underline="none" sx={{ mx: 2 }}>
                        <i style={{ fontSize: '35px' }} className="ri-instagram-line"></i>
                    </Link>
                    <Link href="https://x.com/?lang=es" color="inherit" underline="none" sx={{ mx: 2 }}>
                        <i style={{ fontSize: '35px' }} className="ri-twitter-x-line"></i>
                    </Link>
                    <Link href="https://workspace.google.com/intl/es/gmail/" color="inherit" underline="none" sx={{ mx: 2 }}>
                        <i style={{ fontSize: '35px' }} className="ri-mail-line"></i>
                    </Link>
                    <Typography sx={{ fontSize: '15px', marginTop: '40px' }}>
                        <i className='titles'>© Gamix Argentina {new Date().getFullYear()}</i> 
                    </Typography>
                    <Divider className='bg-white mt-5' />
                    <Box sx={{ paddingTop: '25px' }}>
                        <i className='titles'>All rights reserved. All trademarks and registered trademarks are the property of their respective owners.</i>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
