import { useEffect } from 'react';
import Card from './component/Card';
import Header from './component/Header';
import { useAppDispatch } from './store/hooks';
import { fetchOpenWeatherAPI } from './store/weatherSlice';

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
      <Card />
    </div>
  );
}

export default App;
