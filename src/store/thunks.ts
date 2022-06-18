import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseOpenWeatherData } from '../utilities/parseOpenWetherAPI';

export const fetchOpenWeatherAPI = createAsyncThunk<
  weatherData | undefined,
  coordinates,
  {
    rejectValue: string;
  }
>('weather/fetchData', async ({ latitude, longitude }, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  );
  if (!response.ok) {
    const data = await response.json();
    return rejectWithValue(`${data?.statusCode}/${data.message}`);
  }

  const data: OpenWeatherAPI = await response.json();
  return parseOpenWeatherData(data);
});

export interface OpenWeatherAPI {
  timezone: string;
  daily: daily[];
}
interface daily {
  dt: number;
  temp: {
    day: number;
  };
  weather: weatherOpenWeatherAPI[];
}
type weatherOpenWeatherAPI = {
  description: string;
  main: string;
  icon: string;
};

export interface weatherData {
  location: location;
  weather: weather[];
}
interface location {
  city: string;
  country: string;
}
export interface weather {
  date: string;
  description: string;
  temp: string;
}

export interface coordinates {
  latitude: string;
  longitude: string;
}
