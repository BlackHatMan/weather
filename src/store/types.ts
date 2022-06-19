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

export interface coordinates {
  latitude: string;
  longitude: string;
}

export interface positionstackAPIResp {
  country: string;
  latitude: string;
  longitude: string;
  locality: string;
}
