import { Galleria } from 'primereact/galleria';

import { carouselImages } from '../utils/carouselImages';

import '../styles/Carousel.css';

const CarouselComponent = () => {
  const itemTemplate = (item) => {
    return <img src={item.image } alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  
  }

  const thumbnailTemplate = (item) => {
      return <img src={item.image} alt={item.alt} style={{ display: 'block', width: '100%', height: '100%' }} />;
  }

  return (
      <div className='shadow-lg'> 
        <Galleria 
          value={carouselImages} 
          numVisible={5} 
          circular 
          style={{ maxWidth: '100%' }}
          showThumbnails={true} 
          showItemNavigators 
          item={itemTemplate} 
          thumbnail={thumbnailTemplate} 
        />
      </div>
  )

};

export default CarouselComponent;
