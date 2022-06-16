import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  city: {},
  weather: {},
  error: '',
};

export interface coordinates {
  latitude: string;
  longitude: string;
}

export const fetchOpenWeatherAPI = createAsyncThunk<
  filteredResponseAPI,
  coordinates,
  {
    rejectValue: string;
  }
>('weather/fetchData', async ({ latitude, longitude }, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=12&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  );
  if (!response.ok) {
    const data = await response.json();
    rejectWithValue(`${data?.statusCode}/${data.message}`);
  }

  const data: responseOpenWeatherAPI = await response.json();
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
  return { city, weather };
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOpenWeatherAPI.fulfilled, (state, { payload }) => {
        state.city = payload.city;
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

interface responseOpenWeatherAPI {
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
}

interface city {
  country: string;
  name: string;
}

interface weather {
  date: string;
  temp: number;
  description: string;
}
