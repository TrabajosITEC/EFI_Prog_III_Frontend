import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { grey, purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ id, title, description, image, platform }) => {
  const navigate = useNavigate();
  return (
    <Card
      title={title}
      style={{
        width: '242px',
        margin: '1rem',
        color: 'white',
        border: `2px solid ${purple[800]}`,
        backgroundColor: `${grey[800]}`,
        transition: 'transform 0.2s ease',
      }}
      footer={<Button label="Buy Now" icon="pi pi-shopping-cart" onClick={() => navigate(`/game/${id}`)} className='bg-purple-800 border-none' />}
      header={image ? (
        <img
          alt={platform}
          src={image}
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        />
      ) : null}
      className="hover:scale-105"
    >
      <p>{description}</p>
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
