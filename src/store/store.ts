import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { openWeatherAPI, positionStackAPI, stormGlassAPI } from './RTK';

export const store = configureStore({
  reducer: {
    [openWeatherAPI.reducerPath]: openWeatherAPI.reducer,
    [positionStackAPI.reducerPath]: positionStackAPI.reducer,
    [stormGlassAPI.reducerPath]: stormGlassAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      openWeatherAPI.middleware,
      positionStackAPI.middleware,
      stormGlassAPI.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
