import { useAppSelector } from '../../store/hooks';
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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
          {weather.map((day, i) => {
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
