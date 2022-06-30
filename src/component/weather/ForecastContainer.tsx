import { useGetOpenWeatherQuery, useGetStormGlassWeatherQuery } from '../../store/RTK';
import { API, coordinates, positionstackAPIResp, weather } from '../../store/types';
import { useEffect, useMemo } from 'react';
import { Box, Container, Grow } from '@mui/material';
import TodayCard from './TodayCard';
import Day from './Day';

const ForecastContainer = ({
  handlerPathBg,
  coordinate,
  api,
}: {
  handlerPathBg: (weather: weather[] | undefined) => void;
  coordinate: coordinates | positionstackAPIResp | undefined;
  api: API;
}) => {
  const { data: dataOpen, isFetching } = useGetOpenWeatherQuery(coordinate, {
    skip: api === 'stormGlass' || !coordinate?.latitude,
  });

  const { data: dataStorm } = useGetStormGlassWeatherQuery(coordinate, {
    skip: api === 'openWeather',
  });

  const data = useMemo(() => {
    if (api === 'openWeather') return dataOpen?.weather;
    else if (api === 'stormGlass') return dataStorm?.weather;
  }, [api, dataOpen?.weather, dataStorm?.weather]);

  useEffect(() => {
    handlerPathBg(data);
  }, [data, handlerPathBg]);

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
        <TodayCard weather={data?.[0]} />
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
            {data?.slice(1).map((day, i) => {
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
