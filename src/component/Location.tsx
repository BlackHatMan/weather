import { styled, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    textAlign: 'end',
    fontSize: 32,
    maxWidth: '10rem',
    color: 'white',
  },
  '& .MuiInput-root::before': {
    border: 'none',
  },
  '&& .MuiInput-underline:hover:before': {
    border: 'none',
  },
  '.MuiInput-underline:after': {
    borderBottom: '1px solid white',
  },
});

const Location = () => {
  const { city, country } = useAppSelector((store) => store.weather.location);
  return (
    <div>
      <StyledTextField
        key={city}
        variant="standard"
        defaultValue={city}
        placeholder="Enter city"
        autoComplete="off"
      />
      <Typography textAlign="end" fontSize={18}>
        {country}
      </Typography>
    </div>
  );
};

export default Location;
