import CalendarContainer from './component/Calendar/CalendarContainer';
import ForecastContainer from './component/weather/ForecastContainer';
import { useCallback, useEffect, useState } from 'react';
import SnackbarMessage from './component/SnackBar';
import { Box } from '@mui/material';
import { useGetCoordCityQuery } from './store/RTK';
import { getPathBackground } from './utilities/path';
import { API, coordinates, weather } from './store/types';

function App() {
  const [city, setCity] = useState(localStorage.getItem('city') as string);
  const [api, setApi] = useState<API>('openWeather');
  const [position, setPosition] = useState<coordinates>();
  const [bgPath, setBgPath] = useState<string | undefined>();

  const handlerPathBg = useCallback((weather?: weather[]) => {
    setBgPath(getPathBackground(weather));
  }, []);

  const handlerCity = useCallback((cityQuery: string) => {
    setCity(cityQuery);
  }, []);

  const handlerAPI = useCallback((API: API) => {
    setApi(API);
  }, []);

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setPosition({ latitude: coords.latitude, longitude: coords.longitude });
      });
    }
  }, [city]);

  const { data, error } = useGetCoordCityQuery(city, { skip: !city });

  return (
    <Box
      sx={{
        textAlign: 'center',
        height: ' 100vh',
        display: 'grid',
        gridTemplateRows: '7fr 3fr',
        background: `center/cover no-repeat url(${bgPath})`,
      }}
    >
      <CalendarContainer handlerCity={handlerCity} city={city} handlerAPI={handlerAPI} />
      <ForecastContainer handlerPathBg={handlerPathBg} api={api} coordinate={data || position} />
      <SnackbarMessage error={error} />
    </Box>
  );
}

export default App;
