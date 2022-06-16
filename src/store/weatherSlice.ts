import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseOpenWeatherAPI } from '../utilities/parseOpenWetherAPI';

interface state extends weatherData {
  error: string;
}

const initialState: state = {
  location: {
    city: '',
    location: '',
  },
  weather: [
    {
      date: '',
      description: '',
      temp: 0,
    },
  ],
  error: '',
};

export const fetchOpenWeatherAPI = createAsyncThunk<
  weatherData,
  coordinates,
  {
    rejectValue: string;
  }
>('weather/fetchData', async ({ latitude, longitude }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      /* `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=12&appid=${process.env.REACT_APP_API_KEY}&units=metric` */
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(`${data?.statusCode}/${data.message}`);
    }

    const data: OpenWeatherAPI = await response.json();
    return parseOpenWeatherAPI(data);
  } catch {
    return rejectWithValue(`error parsing`);
  }
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOpenWeatherAPI.fulfilled, (state, { payload }) => {
        state.location = payload.location;
        state.weather = payload.weather;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});
function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
export default weatherSlice.reducer;

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

interface weatherData {
  location: location;
  weather: weather[];
}
interface location {
  city: string;
  location: string;
}
interface weather {
  date: string;
  description: string;
  temp: number;
}

export interface coordinates {
  latitude: string;
  longitude: string;
}

/* interface responseOpenWeatherAPI {
  city: city;
  list: itemOpenWeatherAPI[];
}
interface itemOpenWeatherAPI {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: weatherOpenWeatherAPI[];
}
interface weatherOpenWeatherAPI {
  description: string;
  main: string;
}

 interface filteredResponseAPI {
  city: city;
  weather: weather[];

  interface city {
  country: string;
  name: string;
}
 interface weather {
  date: string;
  temp: number;
  description: string;
}
}
  const city = {
      country: data.city.country,
      name: data.city.name,
    };

    const weather = data.list.map((el) => {
      return {
        date: el.dt_txt,
        temp: el.main.temp,
        description: el.weather[0].main,
      };
    });
    return { city, weather };  */
