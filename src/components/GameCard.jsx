import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { purple } from '@mui/material/colors';

import '../styles/GameCard.css';

const GameCard = ({ title, price, image, plataform }) => {
  return (
    <Card
      title={<h4 className='header-card-title'><b>{title}</b></h4>}
      style={{
        width: '242px',
        margin: '1rem',
        color: 'white',
        border: `2px solid ${purple[800]}`,
        backgroundColor: `rgba(0, 0, 0, 0.7)`,
        transition: 'transform 0.2s ease',
      }}

      footer={<Button label="Buy Now" icon="pi pi-shopping-cart" className='bg-purple-800 border-none d-flex mx-auto' />}
      header={image ? (
        <img
          alt={plataform}
          src={image}
          style={{ width: '100%', height: '180px', objectFit: 'fill' }}
        />
      ) : null}
      className="hover:scale-105 titles"
    >
      <hr />
      <p><b>ARS</b> ${price}</p>
    </Card>
  );
};

const style = document.createElement('style');
style.innerHTML = `
.hover\\:scale-105:hover {
    transform: scale(1.05);
}`;
document.head.appendChild(style);

export default GameCard;
