import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOpenWeatherAPI, weatherData } from './thunks';

interface state extends weatherData {
  error: string;
}

const initialState: state = {
  location: {
    city: '',
    country: '',
  },
  weather: [
    {
      date: '',
      description: '',
      temp: '',
    },
  ],
  error: '',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOpenWeatherAPI.fulfilled, (state, { payload }) => {
        if (payload) {
          state.location = payload.location;
          state.weather = payload.weather;
        }
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
