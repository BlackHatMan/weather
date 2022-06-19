import { Box, styled, Typography } from '@mui/material';
import { weather } from '../../store/types';
import WeatherImage from '../WeatherImage';

export const DayOfWeek = styled(Typography)({
  backgroundColor: 'rgba(21, 21, 22, 0.4)',
  textTransform: 'uppercase',
  margin: '0.7rem ',
  padding: '0.3rem 1rem',
  borderRadius: ' 1rem',
});

const Day: React.FC<weather> = ({ date, description, temp }) => {
  return (
    <Box>
      <DayOfWeek>{date}</DayOfWeek>
      <WeatherImage description={description} />
      <Typography fontSize="1.8rem">{temp}</Typography>
    </Box>
  );
};
export default Day;
