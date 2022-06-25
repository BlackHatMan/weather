import { Box, Container, Grow } from '@mui/material';
import TodayCard from './TodayCard';
import Day from './Day';
import { API, coordinates, weather } from '../../store/types';
import { useState, useEffect } from 'react';
import { useGetCoordCityQuery, useGetOpenWeatherQuery } from '../../store/RTK';

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
  }, [city]);

  const { data: coordinate } = useGetCoordCityQuery(city, { skip: !city });

  const { data, isFetching } = useGetOpenWeatherQuery(position ? position : coordinate, {
    skip: skip(),
  });

  useEffect(() => {
    handlerPathBg(data?.weather);
  }, [data, handlerPathBg]);

  function skip() {
    if (position?.latitude) return false;
    else if (coordinate) return false;
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
        <TodayCard />
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
            {data?.weather.slice(1).map((day, i) => {
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
    </Box>
  );
};

export default ForecastContainer;
