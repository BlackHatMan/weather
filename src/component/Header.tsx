import { Container } from '@mui/material';
import Clock from './Clock';
import Location from './Location';

const Header = () => {
  return (
    <Container
      maxWidth="lg"
      component="header"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Clock />
      <Location />
    </Container>
  );
};

export default Header;
