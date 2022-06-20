import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseOpenWeatherData } from '../utilities/parseOpenWetherAPI';
import { parseStormGlassAPI } from '../utilities/parseStormGlassAPI';
import { getOpenWeatherAPI, getCoordinatesAPI, getStormGlassAPI } from './api';
import { weatherData, coordinates } from './types';

export const fetchOpenWeather = createAsyncThunk<
  weatherData | undefined,
  coordinates,
  {
    rejectValue: string;
  }
>('weather/fetchOpenWeather', async ({ latitude, longitude }, { rejectWithValue }) => {
  try {
    const response = await getOpenWeatherAPI(latitude, longitude);
    return parseOpenWeatherData(response);
  } catch (error) {
    const e = error as Error;
    return rejectWithValue(e.message);
  }
});

export const fetchCityOpenWeather = createAsyncThunk<
  weatherData | undefined,
  string,
  {
    rejectValue: string;
  }
>('weather/fetchCityOpenWeather', async (city, { rejectWithValue }) => {
  try {
    const { country, latitude, longitude, locality } = await getCoordinatesAPI(city);

    const data = await getOpenWeatherAPI(latitude, longitude);
    localStorage.setItem('city', city);
    return parseOpenWeatherData(data, country, locality);
  } catch (error) {
    const e = error as Error;
    return rejectWithValue(e.message);
  }
});

export const fetchStormGlass = createAsyncThunk<
  weatherData | undefined,
  string,
  {
    rejectValue: string;
  }
>('weather/fetchStormGlass', async (city, { rejectWithValue }) => {
  try {
    const { country, latitude, longitude, locality } = await getCoordinatesAPI(city);
    const data = await getStormGlassAPI(latitude, longitude);
    localStorage.setItem('city', city);
    return parseStormGlassAPI(data, country, locality);
  } catch (error) {
    const e = error as Error;
    return rejectWithValue(e.message);
  }
});
