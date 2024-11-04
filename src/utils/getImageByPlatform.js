import pcImage from '../assets/pc-display-horizontal.svg';
import nintendoImage from '../assets/nintendo-switch.svg';
import xboxImage from '../assets/xbox.svg';
import psImage from '../assets/playstation.svg';
import defaultImage from '../assets/controller.svg';

export const getImageByPlatform = (platform) => {
  switch (platform.toUpperCase()) {
    case 'PC':
      return pcImage;
    case 'NINTENDO':
      return nintendoImage;
    case 'XBOX':
      return xboxImage;
    case 'PLAYSTATION':
      return psImage;
    default:
      return defaultImage;
  }

};