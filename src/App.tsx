import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchCityOpenWeather, fetchOpenWeather } from './store/thunks';
import CalendarContainer from './component/Calendar/CalendarContainer';
import ForecastContainer from './component/weather/ForecastContainer';
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
      : navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            dispatch(fetchOpenWeather(pos.coords));
          },
          () => {
            dispatch(fetchCityOpenWeather('Minsk'));
          }
        );
  }, [dispatch]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        height: ' 100vh',
        display: 'grid',
        gridTemplateRows: '7fr 3fr',
        background: `center/cover no-repeat url(${getPathBackground(weather)})`,
      }}
    >
      <CalendarContainer />
      <ForecastContainer />
      <SnackbarMessage />
    </Box>
  );
}

export default App;
