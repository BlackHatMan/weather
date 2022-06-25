import CalendarContainer from './component/Calendar/CalendarContainer';
import ForecastContainer from './component/weather/ForecastContainer';
import SnackbarMessage from './component/SnackBar';
import { Box } from '@mui/material';
import { getPathBackground } from './utilities/path';
import { API, weather } from './store/types';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState(localStorage.getItem('city') || 'Zhlobin');
  const [api, setApi] = useState<API>('openWeather');

  const [bgPath, setBgPath] = useState<string | undefined>();

  const handlerPathBg = (weather?: weather[]) => {
    setBgPath(getPathBackground(weather));
  };
  const handlerCity = (cityQuery: string) => {
    setCity(cityQuery);
  };
  const handlerAPI = (API: API) => {
    setApi(API);
  };
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
      <ForecastContainer handlerPathBg={handlerPathBg} city={city} api={api} />
      <SnackbarMessage />
    </Box>
  );
}

export default App;
