import { Container } from '@mui/material';
import Clock from './Clock';
import Location from './Location';
import TODO from './TODO';

const CalendarContainer = () => {
  return (
    <Container>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: {
            sm: 'space-between',
            xs: 'center',
          },
          pt: 10,
          flexWrap: {
            md: 'wrap',
            sm: 'wrap',
            xs: 'wrap',
          },
        }}
      >
        <Clock />
        <Location />
      </Container>
      <TODO />
    </Container>
  );
};

export default CalendarContainer;
