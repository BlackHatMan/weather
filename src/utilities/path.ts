import cloud from '../assets/cloud.jpeg';
import sun from '../assets/sun.jpg';
import rain from '../assets/rain.jpg';
import snow from '../assets/snow.jpg';
import cloudIcon from '../assets/icon/cloudIcon.jpg';
import rainIcon from '../assets/icon/rainIcon.jpg';
import sunIcon from '../assets/icon/sunIcon.jpg';
import snowIcon from '../assets/icon/snowIcon.jpg';
import { weather } from '../store/types';

export const getPathWeatherImg = (description?: string) => {
  if (description === 'Clouds') return cloudIcon;
  else if (description === 'Rain') return rainIcon;
  else if (description === 'Clear') return sunIcon;
  else if (description === 'Snow') return snowIcon;
  else return cloudIcon;
};

export const getPathBackground = (weather?: weather[]) => {
  if (weather) {
    if (weather[0].description === 'Clear') return sun;
    else if (weather[0].description === 'Clouds') return cloud;
    else if (weather[0].description === 'Rain') return rain;
    else if (weather[0].description === 'Snow') return snow;
    else return cloud;
  }
};
