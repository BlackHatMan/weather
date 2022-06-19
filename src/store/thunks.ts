import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseOpenWeatherData } from '../utilities/parseOpenWetherAPI';
import { weatherData, coordinates, OpenWeatherAPI, positionstackAPIResp } from './types';

export const fetchOpenWeatherAPI = createAsyncThunk<
  weatherData | undefined,
  coordinates,
  {
    rejectValue: string;
  }
>('weather/fetchOpenWeatherAPI', async ({ latitude, longitude }, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHERMAP}&units=metric`
  );
  if (!response.ok) {
    const data = await response.json();
    return rejectWithValue(`${data?.statusCode}/${data.message}`);
  }

  const data: OpenWeatherAPI = await response.json();
  return parseOpenWeatherData(data);
});

export const fetchCityOpenWeatherAPI = createAsyncThunk<
  weatherData | undefined,
  string,
  {
    rejectValue: string;
  }
>('weather/fetchCityOpenWeatherAPI', async (city, { rejectWithValue }) => {
  const responseCoordinate = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${city}&limit=1`
  );
  if (!responseCoordinate.ok) {
    const data = await responseCoordinate.json();
    return rejectWithValue(`${data?.statusCode}/${data.message}`);
  }

  const coordinatesData = await responseCoordinate.json();
  if (coordinatesData.data.length < 1) return rejectWithValue('incorrect city name');

  const { country, latitude, longitude, locality } = coordinatesData
    .data[0] as positionstackAPIResp;

  const responseWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHERMAP}&units=metric`
  );

  const data: OpenWeatherAPI = await responseWeather.json();
  return parseOpenWeatherData(data, country, locality);
});
