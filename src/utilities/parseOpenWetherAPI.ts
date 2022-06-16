import { OpenWeatherAPI } from '../store/weatherSlice';

export function parseOpenWeatherAPI(data: OpenWeatherAPI) {
  const timezone = data.timezone.split('/');
  const location = {
    city: timezone[1],
    location: timezone[0],
  };
  const weather = data.daily.map((day) => {
    return {
      date: new Date(day.dt).toLocaleDateString('en-US', {
        weekday: 'long',
      }),
      description: day.weather[0].main,
      temp: day.temp.day,
    };
  });

  return { location, weather };
}
