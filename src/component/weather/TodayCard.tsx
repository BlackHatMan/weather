import { Box, Typography, useMediaQuery } from '@mui/material';
import WeatherImage from './WeatherImage';
import { DayOfWeek } from './Day';
import { weather } from '../../store/types';

const TodayCard = ({ weather }: { weather?: weather }) => {
  const matches = useMediaQuery('(max-width:1200px)');
  return (
    <Box display="flex" m={matches ? '1rem' : '2rem'} justifyContent="center">
      <WeatherImage description={weather?.description} height={matches ? 140 : 180} />
      <div>
        <DayOfWeek>Today</DayOfWeek>
        <Typography fontSize={matches ? 48 : 64}>{weather?.temp}</Typography>
      </div>
    </Box>
  );
};

export default TodayCard;
