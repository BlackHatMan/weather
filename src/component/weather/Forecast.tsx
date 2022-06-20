import { useAppSelector } from '../../store/store';
import { Box, Container } from '@mui/material';
import TodayCard from './TodayCard';
import Day from './Day';

const Forecast = () => {
  const { weather } = useAppSelector((state) => state.weather);

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(52, 48, 95)',
        opacity: 0.9,
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
          {weather.slice(1).map((day, i) => {
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
      </Container>
    </Box>
  );
};

export default Forecast;
