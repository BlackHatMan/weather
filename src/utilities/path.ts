import cloud from '../assets/cloud.jpeg';
import sun from '../assets/sun.jpg';
import rain from '../assets/rain.jpg';
import snow from '../assets/snow.jpg';
import { weather } from '../store/types';
import cloudIcon from '../assets/imgWeather/cloud.jpg';
import rainIcon from '../assets/imgWeather/rain.jpg';
import sunIcon from '../assets/imgWeather/sun.jpg';
import snowIcon from '../assets/imgWeather/snow.jpg';

export const getPathWeatherImg = (description: string) => {
  if (description === 'Clouds') return cloudIcon;
  else if (description === 'Rain') return rainIcon;
  else if (description === 'Clear') return sunIcon;
  else if (description === 'Snow') return snowIcon;
  else return cloudIcon;
};

export const getPathBackground = (weather: weather[]) => {
  if (weather[0].description === 'Clear') return sun;
  else if (weather[0].description === 'Clouds') return cloud;
  else if (weather[0].description === 'Rain') return rain;
  else if (weather[0].description === 'Snow') return snow;
  else return cloud;
};
