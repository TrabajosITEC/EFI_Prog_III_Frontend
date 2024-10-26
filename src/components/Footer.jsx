import { Box, Typography, Link, Container } from '@mui/material';
import { grey } from '@mui/material/colors';

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
                    © {new Date().getFullYear()} Mi Compañía
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Link href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
                        Inicio
                    </Link>
                    <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>
                        Sobre Nosotros
                    </Link>
                    <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>
                        Contacto
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
