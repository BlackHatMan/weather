import { positionstackAPIResp, OpenWeatherAPI, stormGlassAPIResponse } from './types';

export const getCoordinatesAPI = async (city: string) => {
  const responseCoordinate = await fetch(
    `${process.env.REACT_APP_POSITIONSTACK_URL}?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${city}&limit=1`
  );
  const coordinatesData = await responseCoordinate.json();
  if (!responseCoordinate.ok) {
    throw new Error(`${coordinatesData.error.code}/${coordinatesData.error.context.query.message}`);
  }
  if (coordinatesData.data.length < 1) throw new Error('incorrect city name');

  const data: positionstackAPIResp = coordinatesData.data[0];
  return data;
};

export const getOpenWeatherAPI = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_OPENWEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHERMAP}&units=metric`
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(`${data?.statusCode}/${data.message}`);
  }

  const data: OpenWeatherAPI = await response.json();
  return data;
};
export const getStormGlassAPI = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_STORMGLASS_URL}?lat=${latitude}&lng=${longitude}&params=airTemperature,humidity,windSpeed,precipitation,cloudCover`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_API_KEY_STORMGLASS}`,
      },
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(`${data?.errors.key}`);
  }

  const data: stormGlassAPIResponse = await response.json();
  return data;
};
