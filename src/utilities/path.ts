import cloud from '../assets/cloud.jpeg';
import sun from '../assets/sun.jpg';
import rain from '../assets/rain.jpg';
import snow from '../assets/snow.jpg';
import { weather } from '../store/types';

export const path = {
  cloud: './img/cloud.jpg',
  rain: './img/rain.jpg',
  snow: './img/snow.jpg',
  sun: './img/sun.jpg',
};

export const getPathBackground = (weather: weather[]) => {
  if (weather[0].description === 'Clear') return sun;
  else if (weather[0].description === 'Clouds') return cloud;
  else if (weather[0].description === 'Rain') return rain;
  else if (weather[0].description === 'Snow') return snow;
  else return cloud;
};
