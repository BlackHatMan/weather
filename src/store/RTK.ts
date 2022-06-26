import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseOpenWeatherData } from '../utilities/parseOpenWetherAPI';
import { parseStormGlassAPI } from '../utilities/parseStormGlassAPI';
import {
  coordinates,
  OpenWeatherAPI,
  positionstackAPIResp,
  stormGlassAPIResponse,
  weather,
  weatherData,
} from './types';

export const openWeatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.openweathermap.org/data/2.5`,
  }),
  endpoints: (builder) => ({
    getOpenWeather: builder.query<weatherData, coordinates | undefined>({
      query: (data) => ({
        url: '/onecall',
        params: {
          lat: data?.latitude,
          lon: data?.longitude,
          appid: process.env.REACT_APP_API_KEY_OPENWEATHERMAP,
          units: 'metric',
        },
      }),
      transformResponse: (response: OpenWeatherAPI) => parseOpenWeatherData(response),
    }),
  }),
});

export const stormGlassAPI = createApi({
  reducerPath: 'stormGlassAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.stormglass.io/v2/weather',
  }),
  endpoints: (builder) => ({
    getStormGlassWeather: builder.query<{ weather: weather[] }, coordinates | undefined>({
      query: (data) => ({
        url: `/point?lat=${data?.latitude}&lng=${data?.longitude}&params=airTemperature,humidity,windSpeed,precipitation,cloudCover`,
        headers: {
          Authorization: `${process.env.REACT_APP_API_KEY_STORMGLASS}`,
        },
      }),
      transformResponse: (response: stormGlassAPIResponse) => parseStormGlassAPI(response),
    }),
  }),
});

export const positionStackAPI = createApi({
  reducerPath: 'coordinateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://api.positionstack.com/v1/`,
  }),
  endpoints: (builder) => ({
    getCoordCity: builder.query<positionstackAPIResp, string>({
      query: (city) => ({
        url: 'forward',
        params: {
          access_key: process.env.REACT_APP_API_KEY_POSITIONSTACK,
          query: city,
          limit: '1',
        },
      }),
      transformResponse: (response: any) => response.data[0],
    }),
  }),
});

export const { useGetOpenWeatherQuery } = openWeatherAPI;
export const { useGetStormGlassWeatherQuery } = stormGlassAPI;
export const { useGetCoordCityQuery } = positionStackAPI;
