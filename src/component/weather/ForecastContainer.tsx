import { Box, Container, Grow } from '@mui/material';
import TodayCard from './TodayCard';
import Day from './Day';
import { API, coordinates, positionstackAPIResp, weather } from '../../store/types';
import { useEffect } from 'react';
import { useGetOpenWeatherQuery, useGetStormGlassWeatherQuery } from '../../store/RTK';

const ForecastContainer = ({
  handlerPathBg,
  coordinate,
  api,
}: {
  handlerPathBg: (weather: weather[] | undefined) => void;
  coordinate: coordinates | positionstackAPIResp | undefined;
  api: API;
}) => {
  const { data, isFetching } = useGetOpenWeatherQuery(coordinate, {
    skip: api === 'stormGlass' || !coordinate?.latitude,
  });

  const { data: dataStorm } = useGetStormGlassWeatherQuery(coordinate, {
    skip: api === 'openWeather',
  });

  useEffect(() => {
    handlerPathBg(data?.weather);
  }, [data]);

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
    </Box>
  );
};

export default ForecastContainer;
