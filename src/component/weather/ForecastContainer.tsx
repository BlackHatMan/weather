import { Box, Container, Grow } from '@mui/material';
import TodayCard from './TodayCard';
import Day from './Day';
import { API, coordinates, weather } from '../../store/types';
import { useState, useEffect } from 'react';
import {
  useGetCoordCityQuery,
  useGetOpenWeatherQuery,
  useGetStormGlassWeatherQuery,
} from '../../store/RTK';
import SnackbarMessage from '../SnackBar';

const ForecastContainer = ({
  handlerPathBg,
  city,
  api,
}: {
  handlerPathBg: (weather: weather[] | undefined) => void;
  city: string;
  api: API;
}) => {
  const [position, setPos] = useState<coordinates>();

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setPos({ latitude: coords.latitude, longitude: coords.longitude });
      });
    }
  }, []);

  const { data: coordinate, error } = useGetCoordCityQuery(city, { skip: city ? false : true });

  const { data, isFetching } = useGetOpenWeatherQuery(position ? position : coordinate, {
    skip: api === 'stormGlass' || skip(),
  });

  const { data: dataStorm } = useGetStormGlassWeatherQuery(position ? position : coordinate, {
    skip: api === 'openWeather',
  });

  useEffect(() => {
    handlerPathBg(data?.weather);
  }, [data, handlerPathBg]);

  function skip() {
    if (position?.latitude) return false;
    else if (coordinate?.latitude) return false;
    else return true;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(52, 48, 95)',
        opacity: 0.85,
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: {
            lg: 'space-between',
            md: 'center',
            sm: 'center',
            xs: 'center',
          },
          flexWrap: {
            md: 'nowrap',
            sm: 'nowrap',
            xs: 'wrap',
          },
        }}
      >
        <TodayCard weather={api === 'openWeather' ? data?.weather[0] : dataStorm?.weather[0]} />
        <Grow in={!isFetching}>
          <Box
            display="flex"
            sx={{
              flexWrap: {
                md: 'wrap',
                sm: 'wrap',
                xs: 'wrap',
              },
            }}
          >
            {api === 'openWeather'
              ? data?.weather.slice(1).map((day, i) => {
                  return (
                    <Day
                      key={`${day.date}${i}`}
                      date={day.date}
                      description={day.description}
                      temp={day.temp}
                    />
                  );
                })
              : dataStorm?.weather.slice(1).map((day, i) => {
                  return (
                    <Day
                      key={`${day.date}${i}`}
                      date={day.date}
                      description={day.description}
                      temp={day.temp}
                    />
                  );
                })}
          </Box>
        </Grow>
      </Container>
      <SnackbarMessage error={error} />
    </Box>
  );
};

export default ForecastContainer;
