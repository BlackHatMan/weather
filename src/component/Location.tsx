import { styled, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCityOpenWeatherAPI } from '../store/thunks';

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
  const dispatch = useAppDispatch();
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && city !== event.currentTarget.value && event.currentTarget.value) {
      dispatch(fetchCityOpenWeatherAPI(event.currentTarget.value));
    }
  };
  return (
    <div>
      <StyledTextField
        inputProps={{
          onKeyDown: handleKeyPress,
        }}
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
