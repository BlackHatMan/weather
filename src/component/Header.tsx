import { Container } from '@mui/material';
import Clock from './Clock';
import LocationComponent from './LocationComponent';

const Header = () => {
  return (
    <header>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Clock />
        <LocationComponent />
      </Container>
    </header>
  );
};

export default Header;
