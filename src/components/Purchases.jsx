import { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
import { authService } from "../services/token";

const API = import.meta.env.VITE_API;

export function PurchasesComponent() {
  const [products, setProducts] = useState([]);
  const UserId = authService.getUserId();

  useEffect(() => {
    const fetchCompras = async () => {
      const token = authService.getToken();
      try {
        const response = await fetch(`${API}/purchases/${UserId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        });

        const data = await response.json()
        console.log("🚀 response.ok:", response.ok)
        if (response.status === 404) {
          console.log(data.message);
        } else if (!response.ok) {
          authService.removeToken();
          throw new Error(data.message || JSON.stringify(data));
        }

        setProducts(obtenerProductosCompras(data));


      } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
      }
    };
    fetchCompras();
  }, [UserId]);

  function obtenerProductosCompras(products) {
    const result = [];

    products.forEach(purchase => {
      purchase.PurchaseDetails.forEach(detail => {
        result.push({
          date: purchase.date,
          title: detail.Game.title,
          price: detail.Game.price,
          quantity: detail.quantity
        });
      });
    });

    result.reverse()

    return result;
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ARS' });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <TableContainer
        component={Paper}
        style={{
          marginTop: 160,
          minHeight: 500,
          maxWidth: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 8,
          border: `2px solid ${purple[800]}`,
          overflow: 'hidden',
        }}
      >
        <Box p={2}>
          <Typography className='text-white ' variant="h5" align="center" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            Mis Compras
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Fecha</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Producto</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Precio</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}>{new Date(product.date).toISOString().split('T')[0]}</TableCell>
                <TableCell style={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}>{product.title}</TableCell>
                <TableCell style={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}>{formatCurrency(product.price)}</TableCell>
                <TableCell style={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box p={2} textAlign="center" style={{ color: 'white' }}>
          {products.length === 0 ? 'No has comprado nada todavía.' : `Compras realizadas: ${products.length}`}
        </Box>
      </TableContainer>
    </Grid>
  );
}
