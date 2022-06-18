import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import WeatherImage from '../WeatherImage';
import { StyledTypography } from './Day';

const TodayCard = () => {
  const { weather } = useAppSelector((state) => state.weather);
  return (
    <Box display="flex" m="2rem 4rem 0 0">
      <WeatherImage description={weather[0].description} width={240} height={200} />
      <div>
        <StyledTypography>Today</StyledTypography>
        <Typography fontSize={64}>{weather[0].temp}</Typography>
      </div>
    </Box>
  );
};

export default TodayCard;
