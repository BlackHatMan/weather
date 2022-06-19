import { styled, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCityOpenWeatherAPI } from '../store/thunks';
import SelectAPI from './SelectApi';

const Location = () => {
  const { city, country } = useAppSelector((store) => store.weather.location);
  const dispatch = useAppDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city !== e.currentTarget.value && e.currentTarget.value) {
      dispatch(fetchCityOpenWeatherAPI(e.currentTarget.value));
    }
  };

  return (
    <div>
      <StyledTextField
        InputProps={{
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

      <SelectAPI />
    </div>
  );
};

export default Location;

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    textAlign: 'end',
    fontSize: 32,
    maxWidth: '10rem',
  },
});
