import { Container } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import Clock from './Clock';
import Location from './Location';

const Header = () => {
  const { error } = useAppSelector((state) => state.weather);
  return (
    <Container
      maxWidth="lg"
      component="header"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Clock />
      <h1>{error}</h1>
      <Location />
    </Container>
  );
};

export default Header;
