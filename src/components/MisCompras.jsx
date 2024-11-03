import { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
import { authService } from "../services/token";

const API = import.meta.env.VITE_API;

export default function Tabla() {
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

        const data = await response.json();

        if (!response.ok) {
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
    return products.flatMap((purchase) =>
      purchase.PurchaseDetails.map((detail) => ({
        date: purchase.date,
        title: detail.Game.title,
        price: detail.Game.price,
        quantity: detail.quantity,
      }))
    );
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'ARS' });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <TableContainer
        component={Paper}
        style={{
          maxWidth: 1000,
          backgroundColor: grey[800],
          borderRadius: 8,
          border: `2px solid ${purple[800]}`,
          overflow: 'hidden',
        }}
      >
        <Box p={2}>
          <Typography variant="h5" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
            Mis Compras
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Producto</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: 'white' }}>{product.date}</TableCell>
                <TableCell style={{ color: 'white' }}>{product.title}</TableCell>
                <TableCell style={{ color: 'white' }}>{formatCurrency(product.price)}</TableCell>
                <TableCell style={{ color: 'white' }}>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box p={2} textAlign="center" style={{ color: 'white' }}>
          Compras realizadas: {products.length}
        </Box>
      </TableContainer>
    </Grid>
  );
}
