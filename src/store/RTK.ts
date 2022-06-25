import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseOpenWeatherData } from '../utilities/parseOpenWetherAPI';
import { coordinates, OpenWeatherAPI, positionstackAPIResp, weatherData } from './types';

export const rtkApi = createApi({
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

export const coordinateApi = createApi({
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

export const { useGetOpenWeatherQuery } = rtkApi;
export const { useGetCoordCityQuery } = coordinateApi;
