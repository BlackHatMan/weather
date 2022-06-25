export interface OpenWeatherAPI {
  timezone: string;
  daily: daily[];
}
export interface daily {
  dt: number;
  temp: {
    day: number;
  };
  weather: weatherOpenWeatherAPI[];
}
export type weatherOpenWeatherAPI = {
  description: string;
  main: string;
  icon: string;
};

export interface weatherData {
  location: location;
  weather: weather[];
}

export interface location {
  city: string;
  country: string;
}

export interface weather {
  date: string;
  description: string;
  temp: string;
}

export interface positionstackAPIResp {
  country: string;
  latitude: number;
  longitude: number;
  locality: string;
}

export interface stormGlassAPIResponse {
  hours: stormGlassHoursData[];
}

export interface stormGlassHoursData {
  airTemperature: {
    noaa: number;
    sg: number;
  };
  cloudCover: {
    noaa: number;
    sg: number;
  };
  humidity: {
    noaa: number;
    sg: number;
  };
  precipitation: {
    noaa: number;
    sg: number;
  };
  windSpeed: {
    noaa: number;
    sg: number;
  };
  time: string;
}

export interface state extends weatherData {
  error: string;
  api: API;
  pending: boolean;
}

export type API = 'openWeather' | 'stormGlass';

//export type coordinates = Partial<Pick<GeolocationCoordinates, 'latitude' | 'longitude'>>;

export interface coordinates {
  latitude?: number | undefined;
  longitude?: number | undefined;
}
