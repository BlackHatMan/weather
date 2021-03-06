import { OpenWeatherAPI } from '../store/types';

export function parseOpenWeatherData(data: OpenWeatherAPI, country?: string, locality?: string) {
  const celsius = '\xB0';
  try {
    const timezone = data.timezone.split('/');
    const location = {
      country: country ? country : timezone[0],
      city: locality ? locality : timezone[1],
    };
    const weather = data.daily.map((day) => {
      return {
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        description: day.weather[0].main,
        temp: `${Math.round(day.temp.day)}${celsius}`,
      };
    });
    weather.length = 7;

    return { location, weather };
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
  }
}
