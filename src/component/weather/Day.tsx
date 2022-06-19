import { Box, styled, Typography, useMediaQuery } from '@mui/material';
import { weather } from '../../store/types';
import WeatherImage from '../WeatherImage';

export const DayOfWeek = styled(Typography)(({ theme }) => ({
  backgroundColor: 'rgba(21, 21, 22, 0.4)',
  textTransform: 'uppercase',
  margin: '0.7rem ',
  padding: '0.3rem 1rem',
  borderRadius: ' 1rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '.8rem',
  },
}));

const Day: React.FC<weather> = ({ date, description, temp }) => {
  const matches = useMediaQuery('(max-width:1200px)');
  return (
    <Box
      sx={{
        maxWidth: '110px',
      }}
    >
      <DayOfWeek>{date}</DayOfWeek>
      <WeatherImage description={description} height={matches ? 75 : 85} />
      <Typography fontSize={matches ? '1.2rem' : '1.8rem'}>{temp}</Typography>
    </Box>
  );
};
export default Day;
