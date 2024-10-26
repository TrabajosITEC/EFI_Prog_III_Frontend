import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';

const items = [
  {
    image: 'https://via.placeholder.com/600x300/FF5733/FFFFFF?text=Imagen+1',
    title: 'Título 1',
    description: 'Descripción 1'
  },
  {
    image: 'https://via.placeholder.com/600x300/33FF57/FFFFFF?text=Imagen+2',
    title: 'Título 2',
    description: 'Descripción 2'
  },
  {
    image: 'https://via.placeholder.com/600x300/3357FF/FFFFFF?text=Imagen+3',
    title: 'Título 3',
    description: 'Descripción 3'
  },
];

const CarouselComponent = () => {
  const itemTemplate = (item) => {
    return (
      <div className="carousel-item">
        <img src={item.image} alt={item.title} />
        <div className="carousel-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Button label="Learn More" className="p-button-secondary" />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h2>Carousel Example</h2>
      <Carousel value={items} itemTemplate={itemTemplate} numVisible={1} numScroll={1} />
    </div>
  );
};

export default CarouselComponent;
