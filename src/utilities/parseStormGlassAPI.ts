import { stormGlassAPIResponse, stormGlassHoursData } from '../store/types';

export function parseStormGlassAPI(data: stormGlassAPIResponse, country: string, locality: string) {
  const location = {
    country,
    city: locality,
  };
  const celsius = '\xB0';
  const weather = data.hours
    .map((el) => {
      return {
        date: el.time,
        description: parseDescription(el),
        temp: el.airTemperature.sg,
      };
    })
    .filter((_, idx) => idx % 12 === 0)
    .map((el) => {
      return {
        ...el,
        temp: `${el.temp}${celsius}`,
      };
    });

  function parseDescription(hours: stormGlassHoursData) {
    if (hours.airTemperature.sg < 0) return 'Snow';
    else if (hours.precipitation.sg > 0.02) return 'Rain';
    // else if (hours.windSpeed.sg > 7) return 'Wind';
    else if (hours.cloudCover.sg < 25) return 'Clear';
    else return 'Clouds';
  }
  return { location, weather };
}
