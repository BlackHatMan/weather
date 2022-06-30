import { Container } from '@mui/material';
import { memo } from 'react';
import { API } from '../../store/types';
import Clock from './Clock';
import Location from './Location';
import TODO from './TODO';

const CalendarContainer = ({
  handlerCity,
  city,
  handlerAPI,
}: {
  handlerCity: handlerCity;
  city: string;
  handlerAPI: handlerAPI;
}) => {
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
          pt: {
            lg: '5rem',
            md: '5rem',
            sm: '3rem',
            xs: '3rem',
          },
          flexWrap: {
            md: 'wrap',
            sm: 'wrap',
            xs: 'wrap',
          },
        }}
      >
        <Clock />
        <Location handlerCity={handlerCity} city={city} handlerAPI={handlerAPI} />
      </Container>
      <TODO />
    </Container>
  );
};

export default memo(CalendarContainer);

export type handlerCity = (cityQuery: string) => void;
export type handlerAPI = (api: API) => void;
