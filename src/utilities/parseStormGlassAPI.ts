import { stormGlassAPIResponse, stormGlassHoursData } from '../store/types';

export function parseStormGlassAPI(data: stormGlassAPIResponse) {
  const celsius = '\xB0';

  const weather = data.hours
    .map((el) => {
      return {
        date: new Date(el.time).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        description: parseDescription(el),
        temp: `${Math.round(el.airTemperature.sg)}${celsius}`,
      };
    })
    .filter((_, idx) => idx % 12 === 0)
    .filter((_, idx) => idx % 2 !== 0)
    .slice(0, 7);

  return { weather };
}

function parseDescription(hours: stormGlassHoursData) {
  if (hours.airTemperature.sg < 0) return 'Snow';
  else if (hours.precipitation.sg > 0.02) return 'Rain';
  else if (hours.cloudCover.sg < 25) return 'Clear';
  else return 'Clouds';
}
