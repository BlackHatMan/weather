import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchCityOpenWeather, fetchOpenWeather } from './store/thunks';
import Header from './component/Header';
import Forecast from './component/weather/Forecast';
import SnackbarMessage from './component/SnackBar';
import { Box } from '@mui/material';
import { getPathBackground } from './utilities/path';

function App() {
  const dispatch = useAppDispatch();
  const { weather } = useAppSelector((state) => state.weather);

  useEffect(() => {
    const city = localStorage.getItem('city');
    city
      ? dispatch(fetchCityOpenWeather(city))
      : navigator.geolocation.getCurrentPosition((pos: any) => {
          dispatch(fetchOpenWeather(pos.coords));
        });
  }, [dispatch]);

  return (
    <Box
      className="App"
      sx={{
        textAlign: 'center',
        height: ' 100vh',
        display: 'grid',
        gridTemplateRows: '7fr 3fr',
        background: `center/cover no-repeat url(${getPathBackground(weather)})`,
      }}
    >
      <Header />
      <Forecast />
      <SnackbarMessage />
    </Box>
  );
}

export default App;
