import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { purple } from '@mui/material/colors';

const GameCard = ({ title, description, image, plataform }) => {
  return (
    <Card
      title={title}
      style={{
        width: '250px',
        margin: '1rem',
        color: 'white',
        border: `2px solid ${purple[800]}`, // Color del borde
        backgroundColor: 'transparent', // Sin color de fondo
        transition: 'transform 0.2s ease', // Transición para el efecto hover
      }}
      footer={<Button label="Buy Now" icon="pi pi-shopping-cart" className='bg-purple-800 border-none' />}
      header={image ? (
        <img
          alt={plataform}
          src={image}
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        />
      ) : null}
      className="hover:scale-105" // Clase de PrimeFlex para el hover
    >
      <p>{description}</p>
    </Card>
  );
};

// Agregar estilos para el hover usando PrimeFlex
const style = document.createElement('style');
style.innerHTML = `
.hover\\:scale-105:hover {
    transform: scale(1.05);
}`;
document.head.appendChild(style);

export default GameCard;