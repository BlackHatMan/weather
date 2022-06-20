import { Box, Typography, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../store/store';
import WeatherImage from '../WeatherImage';
import { DayOfWeek } from './Day';

const TodayCard = () => {
  const { weather } = useAppSelector((state) => state.weather);
  const matches = useMediaQuery('(max-width:1200px)');
  return (
    <Box display="flex" m={matches ? '1rem' : '2rem'} justifyContent="center">
      <WeatherImage description={weather[0].description} height={matches ? 140 : 180} />
      <div>
        <DayOfWeek>Today</DayOfWeek>
        <Typography fontSize={matches ? 48 : 64}>{weather[0].temp}</Typography>
      </div>
    </Box>
  );
};

export default TodayCard;
