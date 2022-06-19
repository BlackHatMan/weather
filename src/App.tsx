import { useEffect } from 'react';
import Forecast from './component/weather/Forecast';
import Header from './component/Header';
import { useAppDispatch } from './store/hooks';
import { fetchOpenWeatherAPI } from './store/thunks';
import SnackbarMessage from './component/SnackBar';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: any) => {
      dispatch(fetchOpenWeatherAPI(pos.coords));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Forecast />
      <SnackbarMessage />
    </div>
  );
}

export default App;
