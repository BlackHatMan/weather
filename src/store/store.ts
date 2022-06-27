import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { openWeatherAPI, positionStackAPI, stormGlassAPI } from './RTK';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [stormGlassAPI.reducerPath],
};

const rootReducer = combineReducers({
  [openWeatherAPI.reducerPath]: openWeatherAPI.reducer,
  [positionStackAPI.reducerPath]: positionStackAPI.reducer,
  [stormGlassAPI.reducerPath]: stormGlassAPI.reducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(openWeatherAPI.middleware, positionStackAPI.middleware, stormGlassAPI.middleware),
});

export const persistor = persistStore(store);
