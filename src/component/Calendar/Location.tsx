import { styled, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCityOpenWeather, fetchStormGlass } from '../../store/thunks';
import { API } from '../../store/types';
import SelectAPI from './SelectApi';

const Location = () => {
  const [api, setApi] = useState<API>('openWeather');
  const { city, country } = useAppSelector((store) => store.weather.location);
  const dispatch = useAppDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const queryCity = e.currentTarget.value;
    if (e.key === 'Enter' && city !== queryCity && queryCity) {
      api === 'openWeather'
        ? dispatch(fetchCityOpenWeather(queryCity))
        : dispatch(fetchStormGlass(queryCity));
    }
  };
  const handlerAPI = (api: API) => {
    setApi(api);
    if (city) {
      api === 'openWeather'
        ? dispatch(fetchCityOpenWeather(city))
        : dispatch(fetchStormGlass(city));
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

      <SelectAPI handlerAPI={handlerAPI} />
    </div>
  );
};

export default Location;

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    textAlign: 'end',
    fontSize: 32,
  },
});
