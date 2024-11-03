import { Carousel } from 'primereact/carousel';
import image1 from '../img/dalle.webp';
import image2 from '../img/dalle2.webp';
import image3 from '../img/dalle3.webp';

import './Carousel.css';

const CarouselComponent = () => {
  const carouselImages = [
    { id: 1, image: image1, alt: 'Imagen 1' },
    { id: 2, image: image2, alt: 'Imagen 2' },
    { id: 3, image: image3, alt: 'Imagen 3' },
  ];

  const itemTemplate = (item) => {
    return (
      <div className="carousel-item" key={item.id}>
        <img src={item.image} alt={item.alt} className="carousel-image" />
      </div>
    );
  };


  return (
    <Carousel
      className="custom-carousel"
      value={carouselImages}
      itemTemplate={itemTemplate}
      numVisible={1}
      numScroll={1}
      circular
    />
  );
};

export default CarouselComponent;
