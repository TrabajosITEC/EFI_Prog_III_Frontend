import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { purple } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';

import '../styles/GameCard.css';

const GameCard = ({ id, title, genre, price, image, platform }) => {
  const navigate = useNavigate();

  const handlePagina = (id) => {
    navigate(`/game/${id}`)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }


  return (
    <Card
      title={<h4 className='header-card-title'><b>{title}</b></h4>}
      subTitle={<h4 className='header-card-title' style={{ fontSize: '20px' }}><b>{genre}</b></h4>}
      style={{
        width: '242px',
        margin: '1rem',
        color: 'white',
        border: `2px solid ${purple[800]}`,
        backgroundColor: `rgba(0, 0, 0, 0.7)`,
        transition: 'transform 0.2s ease',
      }}

      footer={<Button label="Buy Now" icon="pi pi-shopping-cart" onClick={() => handlePagina(id)} className='d-flex mx-auto header-card-title' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />}
      header={image ? (
        <img
          className='game-img'
          alt={platform}
          src={image}
          style={{ width: '100%', padding: '20px', height: '180px', objectFit: 'fill' }}
        />
      ) : null}
      className="hover:scale-105 titles"
    >
      <hr />
      <p className='header-card-title'><b>ARS$ </b>{price}</p>
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
