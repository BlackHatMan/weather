import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOpenWeather, fetchCityOpenWeather, fetchStormGlass } from './thunks';
import { state } from './types';

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
  api: 'openWeather',
  pending: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOpenWeather.fulfilled, (state, { payload }) => {
        if (payload) {
          state.error = '';
          state.pending = false;
          state.location = payload.location;
          state.weather = payload.weather;
        }
      })
      .addCase(fetchCityOpenWeather.fulfilled, (state, { payload }) => {
        if (payload) {
          state.error = '';
          state.pending = false;
          state.location = payload.location;
          state.weather = payload.weather;
        }
      })
      .addCase(fetchStormGlass.fulfilled, (state, { payload }) => {
        if (payload) {
          state.error = '';
          state.pending = false;
          state.location = payload.location;
          state.weather = payload.weather;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.pending = true;
      })
      .addMatcher(isPending, (state) => {
        state.pending = true;
      });
  },
});
function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}
export default weatherSlice.reducer;
