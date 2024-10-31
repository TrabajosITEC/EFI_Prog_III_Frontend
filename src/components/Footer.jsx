import { Box, Typography, Link, Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import 'remixicon/fonts/remixicon.css';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: grey[900],
                color: 'white',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    © {new Date().getFullYear()} Itec Río Cuarto
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Link href="https://web.whatsapp.com/" color="inherit" underline="none" sx={{ mx: 1 }}>
                        <i className="ri-whatsapp-line"></i>
                    </Link>
                    <Link href="https://www.instagram.com/?hl=es" color="inherit" underline="none" sx={{ mx: 1 }}>
                        <i className="ri-instagram-line"></i>
                    </Link>
                    <Link href="https://x.com/?lang=es" color="inherit" underline="none" sx={{ mx: 1 }}>
                        <i className="ri-twitter-x-line"></i>
                    </Link>
                    <Link href="https://workspace.google.com/intl/es/gmail/" color="inherit" underline="none" sx={{ mx: 1 }}>
                        <i className="ri-mail-line"></i>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
