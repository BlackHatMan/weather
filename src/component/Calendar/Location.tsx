import { styled, TextField, Typography } from '@mui/material';
import { useGetCoordCityQuery } from '../../store/RTK';
import SelectAPI from './SelectApi';
import { handlerCity, handlerAPI } from './CalendarContainer';
import { memo, useEffect } from 'react';

const Location = ({
  handlerCity,
  city,
  handlerAPI,
}: {
  handlerCity: handlerCity;
  city: string;
  handlerAPI: handlerAPI;
}) => {
  const { data } = useGetCoordCityQuery(city);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const queryCity = e.currentTarget.value;
    if (e.key === 'Enter' && queryCity) {
      handlerCity(queryCity);
    }
  };

  useEffect(() => {
    if (data?.name) localStorage.setItem('city', data?.name);
  }, [data]);

  return (
    <div>
      <StyledTextField
        InputProps={{
          onKeyDown: handleKeyPress,
        }}
        key={data?.name || city}
        variant="standard"
        defaultValue={data?.name || city}
        placeholder="Enter city"
        autoComplete="off"
      />
      <Typography textAlign="end" fontSize={18}>
        {data?.country}
      </Typography>

      <SelectAPI handlerAPI={handlerAPI} />
    </div>
  );
};

export default memo(Location);

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    textAlign: 'end',
    fontSize: 32,
  },
});
